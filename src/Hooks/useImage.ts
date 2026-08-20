import { useEffect, useState } from "react";
import {
    uploadData,
    getUrl,
    remove,
} from "aws-amplify/storage";

const useImage = () => {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    
    // Get current profile image
    useEffect(() => {
        let cancelled = false;

        const loadImage = async () => {
            try {
                const { url } = await getUrl({
                    path: ({ identityId }) =>
                        `private/${identityId}/profile.png`,
                });

                if (!cancelled) {
                    setImageUrl(url.toString());
                }
            } catch (error) {
                if (!cancelled) {
                    setImageUrl("");
                }

                if (
                    error instanceof Error &&
                    error.message.includes("NoSuchKey")
                ) {
                    console.log("No profile image found");
                } else {
                    console.error(
                        "Error fetching profile image:",
                        error
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadImage();

        return () => {
            cancelled = true;
        };
    }, []);

    // Delete image
    const handleDelete = async () => {
        try {
            setDeleting(true);

            await remove({
                path: ({ identityId }) =>
                    `private/${identityId}/profile.png`,
            });

            setImageUrl("");
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete image.");
        } finally {
            setDeleting(false);
        }
    };

    // Upload / update image
    const handleImageChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            alert("Please select an image.");
            event.target.value = "";
            return;
        }

        // Validate file size
        if (file.size > 5 * 1024 * 1024) {
            alert("Image must be smaller than 5MB.");
            event.target.value = "";
            return;
        }

        try {
            setUploading(true);

            // Upload to the user's private Cognito Identity ID path
            await uploadData({
                path: ({ identityId }) =>
                    `private/${identityId}/profile.png`,
                data: file,
                options: {
                    contentType: file.type,
                },
            }).result;

            // Get a fresh temporary URL
            const { url } = await getUrl({
                path: ({ identityId }) =>
                    `private/${identityId}/profile.png`,
            });

            setImageUrl(url.toString());
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload image.");
        } finally {
            setUploading(false);

            // Allow selecting the same file again
            event.target.value = "";
        }
    };

    return {
        imageUrl,
        loading,
        uploading,
        deleting,
        handleImageChange,
        handleDelete,
    };
};

export default useImage;