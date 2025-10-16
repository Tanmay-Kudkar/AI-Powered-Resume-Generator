import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaBrain, FaTrash, FaPaperPlane, FaPlusCircle } from "react-icons/fa";
import { BiBook } from "react-icons/bi";
import { useForm, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";
import Resume from "../components/Resume";
import ResumeTemplate1 from "../components/ResumeTemplate1";
import ResumeTemplate2 from "../components/ResumeTemplate2";
import ResumeTemplate3 from "../components/ResumeTemplate3";
import { generateResume } from "../api/ResumeService";

const defaultResume = {
  personalInformation: {
    fullName: "",
    email: "",
    phoneNumber: "",
    location: "",
    linkedin: "",
    gitHub: "",
    portfolio: "",
    profilePhoto: "", // <-- Add this line
  },
  summary: "",
  skills: [],
  experience: [],
  education: [],
  certifications: [],
  projects: [],
  languages: [],
  interests: [],
};

const resumeTemplates = [
  { label: "Classic Blue (Default)", value: "default" },
  { label: "Modern Minimal", value: "template1" },
  { label: "Elegant Dark", value: "template2" },
  { label: "Professional Gray", value: "template3" },
];

const GenerateResume = () => {
  const [data, setData] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [showFormUI, setShowFormUI] = useState(false);
  const [showResumeUI, setShowResumeUI] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState("default");

  const { register, handleSubmit, control, reset, setValue, watch } = useForm({
    defaultValues: defaultResume,
  });

  const useFieldArrayHelper = (name) => useFieldArray({ control, name });

  const skillsFields = useFieldArrayHelper("skills");
  const experienceFields = useFieldArrayHelper("experience");
  const educationFields = useFieldArrayHelper("education");
  const certificationsFields = useFieldArrayHelper("certifications");
  const projectsFields = useFieldArrayHelper("projects");
  const languagesFields = useFieldArrayHelper("languages");
  const interestsFields = useFieldArrayHelper("interests");

  useEffect(() => {
    const ensureNotEmpty = (fieldArray, template) => {
      if (fieldArray.fields.length === 0) {
        fieldArray.append(template);
      }
    };

    ensureNotEmpty(skillsFields, { title: "", level: "" });
    ensureNotEmpty(certificationsFields, {
      title: "",
      issuingOrganization: "",
      year: "",
    });
    ensureNotEmpty(projectsFields, {
      title: "",
      description: "",
      technologiesUsed: "",
      githubLink: "",
    });
    ensureNotEmpty(languagesFields, { name: "" });
    ensureNotEmpty(interestsFields, { name: "" });
  }, [
    skillsFields,
    certificationsFields,
    projectsFields,
    languagesFields,
    interestsFields,
  ]);

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error("Please enter a resume description.");
      return;
    }

    try {
      setLoading(true);
      const response = await generateResume(description);
      const resumeObject = response.resume || defaultResume;

      reset(resumeObject);
      setData(resumeObject);

      toast.success("Resume Generated Successfully!");
      setShowFormUI(true);
      setShowPromptInput(false);
      setShowResumeUI(false);
    } catch (err) {
      console.error("Resume generation error:", err);
      toast.error("Error generating resume.");
    } finally {
      setLoading(false);
      setDescription("");
    }
  };

  const onSubmit = (formData) => {
    setData(formData);
    setShowFormUI(false);
    setShowResumeUI(true);
  };

  const renderInput = (name, label, type = "text") => (
    <div className="form-control w-full mb-4">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        {...register(name)}
        className="input input-bordered rounded-xl w-full bg-base-100"
      />
    </div>
  );

  const renderFieldArray = (fields, label, name, keys) => (
    <div className="form-control w-full mb-4">
      <h3 className="text-xl font-semibold">{label}</h3>
      {fields.fields.map((field, index) => (
        <motion.div
          key={field.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 rounded-lg mb-4 bg-base-100"
        >
          {keys.map((key) => (
            <div key={key}>
              {renderInput(
                `${name}.${index}.${key}`,
                key.charAt(0).toUpperCase() + key.slice(1)
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => fields.remove(index)}
            className="btn btn-error btn-sm mt-2"
          >
            <FaTrash /> Remove {label}
          </button>
        </motion.div>
      ))}
      <motion.button
        type="button"
        onClick={() =>
          fields.append(keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {}))
        }
        whileHover={{ scale: 1.05 }}
        className="btn btn-secondary btn-sm mt-2 flex items-center"
      >
        <FaPlusCircle className="mr-1" /> Add {label}
      </motion.button>
    </div>
  );

  // Handle profile photo upload
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setValue("personalInformation.profilePhoto", reader.result, {
        shouldDirty: true,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-5 p-10 flex flex-col gap-3 items-center justify-center">
      {showPromptInput && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-base-200 shadow-lg rounded-lg p-10 max-w-2xl w-full text-center"
        >
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <FaBrain className="text-pink-500 text-6xl mb-4 mx-auto" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-6">
            AI Resume Description Input
          </h1>
          <textarea
            disabled={loading}
            className="textarea textarea-bordered w-full h-48 mb-6 resize-none"
            placeholder="Type your description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px #3b82f6" }}
              disabled={loading}
              onClick={handleGenerate}
              className="btn btn-primary flex items-center gap-2"
            >
              {loading && <span className="loading loading-spinner"></span>}
              <FaPaperPlane /> Generate Resume
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px #9333ea" }}
              onClick={() => setDescription("")}
              className="btn btn-secondary flex items-center gap-2"
            >
              <FaTrash /> Clear
            </motion.button>
          </div>
        </motion.div>
      )}

      {showFormUI && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full p-10"
        >
          <h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-2">
            <BiBook className="text-accent" /> Resume Form
          </h1>
          {/* Template Selector */}
          <div className="form-control w-full mb-6">
            <label className="label">
              <span className="label-text font-semibold">
                Choose Resume Template
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            >
              {resumeTemplates.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 space-y-6 bg-base-200 rounded-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput("personalInformation.fullName", "Full Name")}
              {renderInput("personalInformation.email", "Email", "email")}
              {renderInput(
                "personalInformation.phoneNumber",
                "Phone Number",
                "tel"
              )}
              {renderInput("personalInformation.location", "Location")}
              {renderInput("personalInformation.linkedin", "LinkedIn", "url")}
              {renderInput("personalInformation.gitHub", "GitHub", "url")}
              {renderInput("personalInformation.portfolio", "Portfolio", "url")}
              {/* Profile Photo Upload */}
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Profile Photo</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoChange}
                  className="file-input file-input-bordered w-full"
                />
                {/* Preview */}
                {watch("personalInformation.profilePhoto") && (
                  <img
                    src={watch("personalInformation.profilePhoto")}
                    alt="Profile Preview"
                    className="mt-2 w-24 h-24 rounded-full object-cover border-2 border-blue-300"
                  />
                )}
              </div>
            </div>

            <h3 className="text-xl font-semibold">Summary</h3>
            <textarea
              {...register("summary")}
              className="textarea textarea-bordered w-full bg-base-100"
              rows={4}
            ></textarea>

            {renderFieldArray(skillsFields, "Skills", "skills", [
              "title",
              "level",
            ])}
            {renderFieldArray(experienceFields, "Experience", "experience", [
              "jobTitle",
              "company",
              "location",
              "duration",
              "responsibility",
            ])}
            {renderFieldArray(educationFields, "Education", "education", [
              "degree",
              "university",
              "location",
              "graduationYear",
            ])}
            {renderFieldArray(
              certificationsFields,
              "Certifications",
              "certifications",
              ["title", "issuingOrganization", "year"]
            )}
            {renderFieldArray(projectsFields, "Projects", "projects", [
              "title",
              "description",
              "technologiesUsed",
              "githubLink",
            ])}
            <div className="flex gap-3">
              {renderFieldArray(languagesFields, "Languages", "languages", [
                "name",
              ])}
              {renderFieldArray(interestsFields, "Interests", "interests", [
                "name",
              ])}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
              type="submit"
              className="btn btn-primary w-full"
            >
              Save Resume
            </motion.button>
          </form>
        </motion.div>
      )}

      {showResumeUI && data && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full flex flex-col items-center"
        >
          <div className="bg-white shadow-lg p-10 rounded-xl w-full max-w-4xl">
            {/* Render selected template */}
            {selectedTemplate === "default" && <Resume data={data} />}
            {selectedTemplate === "template1" && (
              <ResumeTemplate1 data={data} />
            )}
            {selectedTemplate === "template2" && (
              <ResumeTemplate2 data={data} />
            )}
            {selectedTemplate === "template3" && (
              <ResumeTemplate3 data={data} />
            )}
          </div>
          <div className="flex mt-5 justify-center gap-2">
            <button
              onClick={() => {
                setShowPromptInput(true);
                setShowFormUI(false);
                setShowResumeUI(false);
              }}
              className="btn btn-accent"
            >
              Generate Another
            </button>
            <button
              onClick={() => {
                setShowFormUI(true);
                setShowPromptInput(false);
                setShowResumeUI(false);
              }}
              className="btn btn-success"
            >
              Edit
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GenerateResume;
