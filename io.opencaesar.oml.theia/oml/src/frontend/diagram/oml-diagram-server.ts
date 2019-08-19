import { inject, injectable } from "inversify";
import { LSTheiaDiagramServer } from "sprotty-theia/lib";
import { Action, ActionHandlerRegistry, IModelFactory, TYPES } from "sprotty";
import { FilterAction } from "../widgets/oml-diagram-widget";

@injectable()
export class OmlDiagramServer extends LSTheiaDiagramServer {
    @inject(TYPES.IModelFactory) modelFactory: IModelFactory;

    initialize(registry: ActionHandlerRegistry) {
        super.initialize(registry);
        registry.register(FilterAction.KIND, this);
    }

    handle(action: Action): void {
        super.handle(action);
    }

    handleLocally(action: Action): boolean {
        return super.handleLocally(action);
    }
}
