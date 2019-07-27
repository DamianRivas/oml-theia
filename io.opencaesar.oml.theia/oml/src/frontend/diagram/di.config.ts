/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Container, injectable } from "inversify"
import { KeyTool, TYPES } from 'sprotty/lib'
import { DiagramConfiguration, EditDiagramLocker } from "sprotty-theia/lib"
import { TheiaDiagramServer, LSTheiaDiagramServer, LSTheiaDiagramServerProvider, TheiaKeyTool } from "sprotty-theia/lib"
import { createOmlDiagramContainer } from 'oml-sprotty/lib'
import { OmlDiagramServer } from "./oml-diagram-server";

@injectable()
export class OmlDiagramConfiguration implements DiagramConfiguration {
    diagramType: string = 'oml-diagram'

    createContainer(widgetId: string): Container {
        const container = createOmlDiagramContainer(widgetId)
        container.bind(OmlDiagramServer).toSelf().inSingletonScope();
        container.bind(TheiaDiagramServer).toService(OmlDiagramServer);
        container.bind(LSTheiaDiagramServer).toService(OmlDiagramServer);
        container.bind(TYPES.ModelSource).toService(TheiaDiagramServer);
        container.bind(EditDiagramLocker).toSelf().inSingletonScope();
        container.rebind(KeyTool).to(TheiaKeyTool).inSingletonScope();

        container.bind(LSTheiaDiagramServerProvider).toProvider<LSTheiaDiagramServer>(context => {
            return () => {
                return new Promise<LSTheiaDiagramServer>(resolve => {
                    resolve(context.container.get(LSTheiaDiagramServer));
                });
            };
        });

        return container;
    }
}