import {PersonName} from "../../../shared/domain/model/person-name.value-object.js";
import {DeveloperId} from "./developer-id.value-object.js";

/**
 * Represents a Developer entity with a unique identifier and a name.
 */
export class Developer {

    /**
     * @type {DeveloperId|null}
     * @private
     */
    _id;

    /**
     * @type {PersonName}
     * @private
     */
    _name;

    /**
     * Creates a new Developer instance.
     * @param {string} firstName - The developer's first name.
     * @param {string} lastName - The developer's last name.
     */
    constructor(firstName, lastName) {
        const providedName = new PersonName(firstName, lastName);
        this._id = providedName.isValid() ? DeveloperId.build() : null;
        this._name = providedName;
    }


    /**
     * Gets the developer's name.
     * @returns {PersonName}
     */
    get name() {
        return this._name;
    }

    /**
     * Gets the developer's full name, or "Unknown" if missing.
     * @returns {string}
     */
    get fullName() {
        return this._name?.fullName || "Unknown";
    }

    /**
     * Checks if the developer is registerable (has a full name).
     * @returns {boolean}
     */
    isRegisterable() {
        return this._name ? this._name.isValid() : false;
    }


    /**
     * Gets the developer's ID.
     * @returns {DeveloperId|null}
     */
    get id() {
        return this._id;
    }

    /**
     * Checks if the developer is identified.
     * @returns {boolean}
     */
    isIdentified() {
        return this._id !== null;
    }

}