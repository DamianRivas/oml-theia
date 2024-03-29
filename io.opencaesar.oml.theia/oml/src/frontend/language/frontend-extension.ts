import { ContainerModule, interfaces } from 'inversify'
import { CommandContribution } from '@theia/core/lib/common'
import { LanguageClientContribution } from '@theia/languages/lib/browser'
import { OmlLanguageClientContribution } from './oml-language-client-contribution'
import { DiagramConfiguration } from 'theia-sprotty/lib'
import { OmlDiagramConfiguration } from '../diagram/di.config'
import { DiagramManager, DiagramManagerProvider } from 'theia-sprotty/lib'
import { OmlDiagramManager } from '../diagram/oml-diagram-manager'
import { FrontendApplicationContribution, OpenHandler } from '@theia/core/lib/browser'
import { configuration } from './oml-monaco-language'
import { OmlCommandContribution } from './oml-commands'
import { MonacoEditorProvider } from '@theia/monaco/lib/browser/monaco-editor-provider'
import { OmlMonacoEditorProvider } from "../monaco/oml-monaco-editor-provider"
import 'sprotty/css/sprotty.css'
import 'theia-sprotty/css/theia-sprotty.css'
import { ContextMenuCommands } from './dynamic-commands'
import { ThemeManager } from '../diagram/theme-manager';
import { LanguageGrammarDefinitionContribution } from '@theia/monaco/lib/browser/textmate/textmate-contribution'
import { OmlTextmateContribution } from './oml-textmate-contribution'

export default new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind) => {
    monaco.languages.register({
        id: 'oml',
        aliases: ['Oml', 'oml'],
        extensions: ['.oml'],
        mimetypes: ['text/oml']
    })
    monaco.languages.onLanguage('oml', () => {
        monaco.languages.setLanguageConfiguration('oml', configuration)
    });
    bind(CommandContribution).to(OmlCommandContribution).inSingletonScope();
    bind(OmlLanguageClientContribution).toSelf().inSingletonScope()
    bind(LanguageClientContribution).toDynamicValue(ctx => ctx.container.get(OmlLanguageClientContribution))
    bind(DiagramConfiguration).to(OmlDiagramConfiguration).inSingletonScope()
    bind(DiagramManagerProvider).toProvider<DiagramManager>(context => {
        return () => {
            return new Promise<DiagramManager>((resolve) =>
                resolve(context.container.get(OmlDiagramManager))
            )
        }
    }).whenTargetNamed('oml-diagram')
    bind(OmlDiagramManager).toSelf().inSingletonScope()
    bind(FrontendApplicationContribution).toDynamicValue(context => context.container.get(OmlDiagramManager))
    bind(OpenHandler).toDynamicValue(context => context.container.get(OmlDiagramManager))
    bind(ContextMenuCommands).to(ContextMenuCommands).inSingletonScope()
    rebind(MonacoEditorProvider).to(OmlMonacoEditorProvider).inSingletonScope()
    bind(ThemeManager).toSelf().inSingletonScope()
    bind(LanguageGrammarDefinitionContribution).to(OmlTextmateContribution).inSingletonScope()
})