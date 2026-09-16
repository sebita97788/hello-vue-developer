/**
 * Represents a person's name as a Value Object.
 */
export class PersonName {
    /**
     * The first name of the person.
     * @type {string}
     * @private
     */
    _firstName;

    /**
     * The last name of the person.
     * @type {string}
     * @private
     */
    _lastName;

    /**
     * Creates a new PersonName instance.
     * @param {string} firstName - The first name.
     * @param {string} lastName - The last name.
     */
    constructor(firstName, lastName) {
        const trimmedFirstName = firstName?.trim() || "";
        const trimmedLastName = lastName?.trim() || "";
        this._firstName = trimmedFirstName;
        this._lastName = trimmedLastName;
    }

    /**
     * Gets the first name.
     * @returns {string}
     */
    get firstName() {
        return this._firstName;
    }

    /**
     * Gets the last name.
     * @returns {string} The last name.
     */
    get lastName() {
        return this._lastName;
    }

    /**
     * Gets the full name.
     * @returns {string} The full name, which is a combination of first and last names.
     */
    get fullName() {
        return [this._firstName, this._lastName].filter(name => name.length > 0).join(" ");
    }

    /**
     * Compares this PersonName with another for equality.
     * @param {PersonName} other - The other PersonName to compare.
     * @returns {boolean} true if the PersonNames are equal, false otherwise.
     */
    equals(other) {
        return other instanceof PersonName &&
            this._firstName === other.firstName &&
            this._lastName === other.lastName;
    }

    /**
     * Checks if both first and last names are present.
     * @returns {boolean} true if both names are present, false otherwise.
     */
    isValid() {
        return this.isFullyNamed();
    }

    /**
     * Checks if both first and last names are present.
     * @returns {boolean} true if both names are present, false otherwise.
     */
    isFullyNamed() {
        return this._firstName.length > 0 && this._lastName.length > 0;
    }
}