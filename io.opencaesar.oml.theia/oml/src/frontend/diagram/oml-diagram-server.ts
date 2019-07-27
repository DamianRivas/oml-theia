import { inject, injectable } from "inversify";
import { LSTheiaDiagramServer } from "sprotty-theia/lib";
import { Action, ActionHandlerRegistry, IModelFactory, TYPES } from "sprotty";

@injectable()
export class OmlDiagramServer extends LSTheiaDiagramServer {
    @inject(TYPES.IModelFactory) modelFactory: IModelFactory;

    initialize(registry: ActionHandlerRegistry) {
        super.initialize(registry);
    }

    handleLocally(action: Action): boolean {
        return super.handleLocally(action);
    }
}
