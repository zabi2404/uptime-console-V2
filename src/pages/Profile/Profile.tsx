import { useEffect, useState } from "react";
import Button from "../../components/common/Buttons/Button";
import DangeZone from "./DangeZone";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { fetchUser } from "@/redux/Projects/UserSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import ProfileImage from "@/components/Profile/ProfileImage";




interface ProfileData {
    id: string;
    name: string | null;
    email: string | null;
    phoneNumber: string | null;
    companyName: string | null;
    websiteUrl: string | null;
    address: string | null;
}

interface ProfileFieldProps {
    label: string;
    name: string;
    value: string | null;
    isEditing: boolean;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<ProfileData>({
        id: "",
        name: null,
        email: null,
        phoneNumber: null,
        companyName: null,
        websiteUrl: null,
        address: null,
    });

    const dispatch = useDispatch<AppDispatch>();
    const client = generateClient<Schema>();

    // const { loading, error } = useSelector(
    //     (state: RootState) => state.user
    // )


    const [originalProfile, setOriginalProfile] = useState<ProfileData>(
        profile
    );

    useEffect(() => {
        const loadProfile = async () => {
            const userData = await dispatch(fetchUser()).unwrap();
            setProfile(userData);
            setOriginalProfile(userData);

        };
        loadProfile();
    }, []);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCancel = () => {
        setProfile(originalProfile);
        setIsEditing(false);
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            await client.models.UserProfile.update({
                id: profile.id,
                name: profile.name || "",
                email: profile.email || "",
                phoneNumber: profile.phoneNumber || "",
                companyName: profile.companyName || "",
                websiteUrl: profile.websiteUrl || "",
                address: profile.address || "",
            });


            setOriginalProfile(profile);
            setIsEditing(false);

            console.log("Profile updated successfully");
        } catch (error) {
            console.error("Failed to update profile:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-[32px] font-semibold">
                Profile
            </h1>
        <ProfileImage />
            <div className="my-6 rounded-xl border border-gray-200 p-4 shadow-sm">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold">
                        Account Details
                    </h1>

                    {!isEditing ? (
                        <Button
                            name="Edit"
                            variant="primary"
                            onClick={() => setIsEditing(true)}
                        />
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                name="Cancel"
                                variant="secondary"
                                onClick={handleCancel}
                            />

                            <Button
                                name={loading ? "Saving..." : "Save"}
                                variant="primary"
                                onClick={handleSave}
                                disableButton={loading ? true : false}
                            />
                        </div>
                    )}
                </div>

                {/* Profile fields */}
                <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">

                    {/* Personal details */}
                    <div className="grid gap-3">

                        <ProfileField
                            label="Name"
                            name="name"
                            value={profile.name}
                            isEditing={isEditing}
                            onChange={handleChange}
                        />

                        <ProfileField
                            label="Email"
                            name="email"
                            value={profile.email}
                            isEditing={false}
                            onChange={handleChange}
                        />

                        <ProfileField
                            label="Phone number"
                            name="phoneNumber"
                            value={profile.phoneNumber}
                            isEditing={isEditing}
                            onChange={handleChange}
                        />

                    </div>

                    {/* Company */}
                    <div className="grid gap-3 border-gray-300 sm:border-l sm:pl-4">

                        <ProfileField
                            label="Company name"
                            name="companyName"
                            value={profile.companyName}
                            isEditing={isEditing}
                            onChange={handleChange}
                        />

                        <ProfileField
                            label="Website URL"
                            name="websiteUrl"
                            value={profile.websiteUrl}
                            isEditing={isEditing}
                            onChange={handleChange}
                        />

                    </div>

                    {/* Address */}
                    <div className="grid gap-3 border-gray-300 md:border-l md:pl-4">

                        <div>
                            <h2 className="text-sm font-semibold text-gray-900">
                                Address
                            </h2>

                            {isEditing ? (
                                <textarea
                                    name="address"
                                    value={profile.address || ""}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-xs outline-none focus:border-gray-500"
                                    rows={3}
                                />
                            ) : (
                                <p className="mt-0.5 max-w-xs text-xs leading-5 text-gray-500">
                                    {profile.address || "Not provided"}
                                </p>
                            )}
                        </div>

                    </div>

                </div>
            </div>

            <DangeZone />
        </div>
    );
};



const ProfileField = ({
    label,
    name,
    value,
    isEditing,
    onChange,
}: ProfileFieldProps) => {
    return (
        <div>
            <h2 className="text-sm font-semibold text-gray-900">
                {label}
            </h2>

            {isEditing ? (
                <input
                    type="text"
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-xs outline-none focus:border-gray-500"
                />
            ) : (
                <p className="mt-0.5 text-xs text-gray-500">
                    {value || "Not provided"}
                </p>
            )}
        </div>
    );
};

export default Profile;
