
/**
 *
 *@description This function takes an OData manifest.xml string and returns the substring containing
 *             all the entitysets. I.E. substring between the tags <EntityContainer> and </EntityContainer>
 * @param {string} [sManifest=""]
 * @return {String} 
 */
function extractEntitysetsStringFromManifest(sManifest = "") {
    let regex = /<EntityContainer.*?>([\S\s]*)<\/EntityContainer>/igm;
    let matches = regex.exec(sManifest) || [];
    return matches.length >= 2 ? matches[matches.length - 1] : "";
}

/**
 *
 * @description This function takes an OData manifest.xml string and returns all the entities listed
 *              within the entity container tag
 * @param {string} [sManifest=""]
 * @return {String[]} 
 */
function getEntitiesFromManifest(sManifest = "") {
    let entitysetsStr = extractEntitysetsStringFromManifest(sManifest);
    let regex = /Name="([\w\-_]+)"/igm;
    let matches = Array.from(entitysetsStr.matchAll(regex)) || [];
    let entities = [];
    for (let match of matches) {
        if (match?.length >= 1) {
            entities.push(match[1]);
        }
    }
    return entities;
}

exports.getEntitiesFromManifest = getEntitiesFromManifest;
