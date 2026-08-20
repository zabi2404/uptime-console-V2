
// const IMAGE_PATH = "private/profile.png";

import useImage from "@/Hooks/useImage";

export default function ProfileImage() {


const {imageUrl, loading, uploading, deleting, handleImageChange, handleDelete} = useImage();


    return (
        <div className="flex flex-col items-center gap-4">
            {/* Image */}
            <div className="w-32 h-32 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">
                {loading ? (
                    <span className="text-sm text-gray-500">
                        Loading...
                    </span>
                ) : imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-sm text-gray-500">
                        No image
                    </span>
                )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
                {/* Upload / Update */}
                <label
                    className={`cursor-pointer px-4 py-2 rounded-lg bg-black text-white ${uploading ? "opacity-50 pointer-events-none" : ""
                        }`}
                >
                    {uploading
                        ? "Uploading..."
                        : imageUrl
                            ? "Update Image"
                            : "Add Image"}

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        disabled={uploading}
                    />
                </label>

                {/* Delete */}
                {imageUrl && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleting}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white disabled:opacity-50"
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </button>
                )}
            </div>
        </div>
    );
}