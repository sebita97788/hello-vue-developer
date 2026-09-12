import {generateUUID, isValidUUID} from "../../../shared/domain/uuid.js";

/**
 * Represents a Universally Unique Identifier (UUID) as a Value Object.
 */
export class DeveloperId {

    /**
     * The UUID string value.
     * @type {string}
     * @private
     */
    _value;

    /**
     * Creates a new DeveloperId instance.
     * @param {string} value - The UUID string.
     * @throws {Error} If the value is not a valid UUID.
     */
    constructor(value) {
        if (!isValidUUID(value)) {
            throw new Error(`Invalid UUID: ${value}`);
        }
        this._value = value;
    }

    /**
     * Gets the UUID string value.
     * @returns {string}
     */
    get value() {
        return this._value;
    }

    /**
     * Generates a new random UUID v7.
     * @returns {DeveloperId}
     */
    static build() {
        return new DeveloperId(generateUUID());
    }

    /**
     * Compares this DeveloperId with another for equality.
     * @param {DeveloperId} other - The other DeveloperId to compare.
     * @returns {boolean}
     */
    equals(other) {
        return other instanceof DeveloperId && this._value === other.value;
    }

    /**
     * Returns the string representation of the UUID.
     * @returns {string}
     */
    toString() {
        return this._value;
    }
}