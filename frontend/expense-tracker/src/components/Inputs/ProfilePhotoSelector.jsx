import { useEffect, useRef, useState } from "react";
import { LuTrash, LuUpload, LuUser } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }
    if (typeof image === "string") {
      // image is a URL string
      setPreviewUrl(image);
    } else {
      // image is a File object, create Object URL
      const objectUrl = URL.createObjectURL(image);
      setPreviewUrl(objectUrl);

      // cleanup
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = null;
  };

  const onChooseFile = () => inputRef.current.click();

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!previewUrl ? (
        <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
          <LuUser className="text-4xl text-primary" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1"
            onClick={onChooseFile}
            aria-label="Upload profile photo"
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative w-20 h-20">
          <img
            src={previewUrl}
            alt="Profile photo"
            className="w-20 h-20 rounded-full object-cover"
            onError={(e) => {
              // fallback in case image fails to load
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/80?text=No+Image"; // or your placeholder
            }}
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 right-1"
            onClick={handleRemoveImage}
            aria-label="Remove profile photo"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
