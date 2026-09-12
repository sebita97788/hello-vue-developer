import {PersonName} from "../../../shared/domain/model/person-name.value-object.js";

export class Developer {
    _id;
    _name;

    constructor(firstName, lastName) {
        const providedName = new PersonName(firstName, lastName);
        this._id = providedName.isValid() ? DeveloperId.build() : null;
        this._name = providedName;
    }
}