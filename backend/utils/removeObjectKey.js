export default function removeKeysFromObject(obj, keys) {
    for (let key of keys) {
        delete obj[key];
    }
    return obj;
}
