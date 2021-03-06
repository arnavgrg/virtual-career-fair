import { AbstractDefaultDBCrudStrategy } from "../../db/abstractDefaultDBCrudStrategy";
import { CompanyDBSchema } from "./companyDBSchema";

class CompanyDBStrategy extends AbstractDefaultDBCrudStrategy<CompanyDBSchema>
{
    private static collectionName = "company";

    public getCollectionName(): string {
        return CompanyDBStrategy.collectionName;
    }
}

export { CompanyDBStrategy };