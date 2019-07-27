/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { inject, injectable } from 'inversify'
import { EditorManager } from '@theia/editor/lib/browser'
// import { OmlLanguageClientContribution } from '../language/oml-language-client-contribution'
import { OmlDiagramLanguageClient } from "./oml-diagram-language-client";
import { TheiaSprottyConnector, LSTheiaSprottyConnector, TheiaFileSaver, DiagramManager } from 'sprotty-theia/lib'
import { ThemeManager } from './theme-manager';
import { WidgetManager, QuickPickService } from '@theia/core/lib/browser';
import { MonacoWorkspace } from "@theia/monaco/lib/browser/monaco-workspace";

@injectable()
export class OmlDiagramManager extends DiagramManager {

    readonly diagramType = 'oml-diagram'
    readonly iconClass = 'fa fa-microchip'

    _diagramConnector: TheiaSprottyConnector

    constructor(@inject(OmlDiagramLanguageClient) diagramLanguageClient: OmlDiagramLanguageClient,
                @inject(TheiaFileSaver) fileSaver: TheiaFileSaver,
                @inject(WidgetManager) widgetManager: WidgetManager,
                @inject(EditorManager) editorManager: EditorManager,
                @inject(MonacoWorkspace) workspace: MonacoWorkspace,
                @inject(QuickPickService) quickPickService: QuickPickService,
                @inject(ThemeManager) themeManager: ThemeManager) {
                // @inject(DiagramWidgetRegistry) diagramWidgetRegistry: DiagramWidgetRegistry,
        super()
        themeManager.initialize()
        this._diagramConnector = new LSTheiaSprottyConnector({
            diagramLanguageClient, fileSaver, editorManager, widgetManager, workspace, quickPickService, diagramManager: this
        })
    }

    get diagramConnector() {
        return this._diagramConnector
    }

    get label() {
        return 'Oml diagram'
    }
}