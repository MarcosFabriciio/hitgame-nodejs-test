import { Injectable } from "@nestjs/common";
import { Meta } from "../response/meta";
import { HelperConstants } from "./helperConstants";

@Injectable()
export class HelperService {
    calcTotalPages(count: number) {
        const totalCalculation = count / HelperConstants.RESULTS_PER_PAGE;
        return count % HelperConstants.RESULTS_PER_PAGE == 0
            ? totalCalculation
            : Math.trunc(totalCalculation + 1);
    }

    returnMeta(statusCodeParam: number): Meta {
        const list = Array.of(
            new Meta(HelperConstants.OPERATION_SUCCESS, "Operation performed successfully!"),
            new Meta(HelperConstants.ERROR, "An error occurred while performing the operation!"),
        );

        return list.find((element) => element.statusCode == statusCodeParam);
    }
}
