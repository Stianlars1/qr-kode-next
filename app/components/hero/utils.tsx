import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const updateDownloadCount = async () => {
  console.log("updateDownloadCount");
  const updateDownloadCountQuery = doc(db, "qr-kode", "insights");

  await updateDoc(updateDownloadCountQuery, {
    downloads: increment(1),
  });
};
export const updateGeneratedCount = async () => {
  const updateDownloadCountQuery = doc(db, "qr-kode", "insights");

  await updateDoc(updateDownloadCountQuery, {
    generated: increment(1),
  });
};
export const updateAddedLogo = async () => {
  const updateDownloadCountQuery = doc(db, "qr-kode", "insights");

  await updateDoc(updateDownloadCountQuery, {
    addedLogo: increment(1),
  });
};
