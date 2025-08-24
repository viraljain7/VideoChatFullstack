import React, { useState } from "react";
import { useAuthUser } from "../hooks/useAuthUser";
import { ArrowRight, CircleUser, ShuffleIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { onboarding } from "../lib/api";
import { LANGUAGES } from "../constants";

function OnboardingPage() {
  const {  authUser } = useAuthUser();

  
  const [onboardingData, setOnboardingData] = useState({
    fullName: authUser.fullName || "",
    bio: authUser.bio || "",
    location: authUser.location || "",
    nativeLanguage: authUser.nativeLanguage || "",
    learningLanguage: authUser.learningLanguage || "",
    avatarUrl: authUser.profilePic,
  });

    console.log(onboardingData.avatarUrl)
  const changeHandler = (e) => {
    setOnboardingData({
      ...onboardingData,
      [e.target.name]: e.target.value,
    });
  };

  const queryClient = useQueryClient();
  const {
    mutate: onboardingMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: onboarding,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success(data.message || "Onboarding successful!!.");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Onboarding failed. Please try again.",
      );
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    onboardingMutation(onboardingData);
  };



  const handleImageChange = () => {
    const randomNum = Math.floor(Math.random() * 100);
    const newImgUrl = `https://avatar.iran.liara.run/public/${randomNum}.png`;

    setOnboardingData((prev) => ({
      ...prev,
      avatarUrl: newImgUrl,
    }));

    toast.success("Avatar changed!!.");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center  p-6"
      data-theme="lofi"
    >
      <div className="card w-full max-w-lg border border-base-500/40 shadow-3xl p-6 space-y-6">
        {/* Image Preview */}
        <h1 className="text-center font-bold text-xl mb-4">
          Complete your Profile{" "}
        </h1>

        <div className="flex flex-col items-center space-y-3">
        <div className="avatar">
  <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden cursor-pointer" onClick={handleImageChange}>
    {onboardingData.avatarUrl ? (
      <img src={onboardingData.avatarUrl} alt="Profile Avatar" className="w-full h-full object-cover" />
    ) : (
      <CircleUser className="w-full h-full" />
    )}
  </div>
</div>

<button type="button" onClick={handleImageChange} className="btn btn-accent">
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>

        </div>

        {/* Full Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="input input-bordered w-full font-bold"
            name="fullName"
            value={onboardingData.fullName}
            onChange={changeHandler}
            required
          />
        </div>

        {/* Bio */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Bio</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24 font-bold"
            placeholder="Write something about yourself..."
            name="bio"
            value={onboardingData.bio}
            onChange={changeHandler}
            required
          ></textarea>
        </div>

        {/* Location */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            placeholder="Enter your city / country"
            className="input input-bordered w-full font-bold"
            name="location"
            value={onboardingData.location}
            onChange={changeHandler}
            required
          />
        </div>

        {/* Languages in 2 Columns */}
        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Native Language</span>
            </label>
            <select
              className="select select-bordered w-full font-bold"
              name="nativeLanguage"
              value={onboardingData.nativeLanguage}
              onChange={changeHandler}
              required
            >
              <option disabled defaultValue>
                Select native
              </option>
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang.toLowerCase()}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Learning Language</span>
            </label>
            <select
              className="select select-bordered w-full font-bold"
              name="learningLanguage"
              value={onboardingData.learningLanguage}
              onChange={changeHandler}
              required
            >
              <option disabled defaultValue>
                Select learning
              </option>
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang.toLowerCase()}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>

    {
        error &&    <p className="bg-red-300/30 rounded-lg p-2 pl-8 text-black font-semibold ">{  error?.response?.data?.message }</p>
    }
        {/* CTA Button */}
        {/* CTA Button with Lucide Icon */}
        <button
          className="btn btn-primary w-full text-lg flex items-center justify-center gap-2"
          onClick={submitHandler}
          disabled={isPending}
        >
          Complete Onboarding <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default OnboardingPage;
