import {v7 as uuidv7, validate as uuidIsValid, version as getUUIDVersion} from 'uuid';

const UUID_VERSION_7 = 7;

/**
 * Generates a new UUID v7.
 * @returns {string | Uint8Array} The generated UUID v7.
 */
export const generateUUID = () => {
    return uuidv7();
};

/**
 * Checks if a given string is a valid UUID.
 * @param {string} uuid - The UUID to validate.
 * @returns {boolean} true if the UUID is valid, false otherwise.
 */
export const isValidUUID = (uuid) => {
    return uuidIsValid(uuid) && getUUIDVersion(uuid) === UUID_VERSION_7;
}