/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Container, injectable } from "inversify"
import { KeyTool, TYPES } from 'sprotty/lib'
import { DiagramConfiguration } from "theia-sprotty/lib"
import { TheiaDiagramServer } from "theia-sprotty/lib"
import { TheiaKeyTool } from 'theia-sprotty/lib'
import { createOmlDiagramContainer } from 'oml-sprotty/lib'

@injectable()
export class OmlDiagramConfiguration implements DiagramConfiguration {
    diagramType: string = 'oml-diagram'

    createContainer(widgetId: string): Container {
        const container = createOmlDiagramContainer(widgetId)
        container.bind(TYPES.ModelSource).to(TheiaDiagramServer).inSingletonScope()
        container.rebind(KeyTool).to(TheiaKeyTool).inSingletonScope()
        return container
    }
}