import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import { RootEntity } from "./entities";
import { IEntityService } from "./interfaces";

export abstract class EntityService<E extends RootEntity>
    implements IEntityService<E>
{
    constructor(private repository: Repository<E>) {}

    getOneBy(options: FindOptionsWhere<E>): Promise<E | null> {
        return this.repository.findOneBy(options);
    }

    getManyBy(options: FindOptionsWhere<E>): Promise<Array<E>> {
        return this.repository.findBy(options);
    }

    findBy(options: FindManyOptions<E>): Promise<Array<E>> {
        return this.repository.find(options);
    }

    save(entity: E, data: Partial<E>): Promise<E> {
        const instance = structuredClone(entity);
        Object.assign(instance, data);

        return this.repository.save(instance);
    }

    remove(...entities: Array<E>): Promise<Array<E>> {
        return this.repository.remove(entities);
    }
}
