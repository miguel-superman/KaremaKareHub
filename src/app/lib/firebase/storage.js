import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";

const storage = getStorage();

export async function uploadFile(file, path) {

    if (!file) return null;

    const storageRef = ref(storage, path);

    await uploadBytes(storageRef, file);

    return await getDownloadURL(storageRef);

}