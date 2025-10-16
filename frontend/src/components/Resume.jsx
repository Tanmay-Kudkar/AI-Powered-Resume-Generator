import { useRef } from "react";
import "daisyui/dist/full.css";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

const Resume = ({ data }) => {
  const resumeRef = useRef(null);

  // Data with safe defaults
  const {
    personalInformation = {},
    summary = "A passionate software engineer eager to contribute expertise to innovative projects.",
    skills = [],
    experience = [],
    education = [],
    certifications = [],
    projects = [],
    achievements = [],
    languages = [],
    interests = [],
  } = data || {};

  // Generate and download PDF from resume DOM
  const handleDownloadPdf = () => {
    if (!resumeRef.current) return;

    const fileName = prompt(
      "Enter a file name for your resume:",
      personalInformation.fullName || "resume"
    );
    if (!fileName) return;

    // Conversion of resume DOM element to PNG image
    toPng(resumeRef.current, { quality: 1.0, backgroundColor: "#ffffff" })
      .then((dataUrl) => {
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Add the image to PDF
        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${fileName}.pdf`);
      })
      .catch((err) => console.error("Error generating PDF", err));
  };

  // Trigger browser print dialog
  const handlePrint = () => {
    window.print();
  };

  // Utility function: Safely render tech stack
  const renderTechnologies = (tech) => {
    if (!tech) return "";
    if (Array.isArray(tech)) return tech.join(", ");
    if (typeof tech === "string") return tech;
    return "";
  };

  return (
    <>
      {/* Resume Wrapper */}
      <div
        ref={resumeRef}
        className="max-w-5xl mx-auto shadow-2xl rounded-lg overflow-hidden grid grid-cols-3 bg-white text-gray-900 border border-gray-200 print:border-0 print:shadow-none"
      >
        {/* SIDEBAR */}
        <aside className="bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6 space-y-6">
          {/* Profile Photo */}
          {personalInformation.profilePhoto && (
            <div className="flex justify-center mb-4">
              <img
                src={personalInformation.profilePhoto}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-300 shadow-lg"
                // If base64, it will work; if URL, it will work
              />
            </div>
          )}
          {/* Name & Location */}
          <div className="text-center">
            <h1 className="text-3xl font-bold leading-tight">
              {personalInformation.fullName || "Your Name"}
            </h1>
            <p className="text-blue-100 mt-1">
              {personalInformation.location || "City, Country"}
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-2 text-sm">
            {personalInformation.email && (
              <div className="flex items-center gap-2">
                <FaEnvelope /> {personalInformation.email}
              </div>
            )}
            {personalInformation.phoneNumber && (
              <div className="flex items-center gap-2">
                <FaPhone /> {personalInformation.phoneNumber}
              </div>
            )}
            {personalInformation.gitHub && (
              <a
                href={personalInformation.gitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <FaGithub /> GitHub
              </a>
            )}
            {personalInformation.linkedIn && (
              <a
                href={personalInformation.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <FaLinkedin /> LinkedIn
              </a>
            )}
          </div>

          {/* Skills Section */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b border-blue-300 pb-1 mb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-white/20 text-sm px-3 py-1 rounded-full"
                  >
                    {skill.title || skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certifications Section */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b border-blue-300 pb-1 mb-2">
                Certifications
              </h2>
              <ul className="text-sm list-disc list-inside space-y-1">
                {certifications.map((cert, idx) => (
                  <li key={idx}>{cert.title || cert}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/*MAIN CONTENT*/}
        <main className="col-span-2 p-6 space-y-6">
          {/* Summary Section */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-700">Summary</h2>
            <p className="mt-2 text-gray-700">{summary}</p>
          </section>

          {/* Experience Section */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-blue-700">
                Experience
              </h2>
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="mt-3 p-4 border border-gray-200 rounded-lg shadow-sm"
                >
                  <h3 className="text-lg font-bold">{exp.jobTitle}</h3>
                  <p className="text-gray-500">
                    {exp.company} • {exp.location}
                  </p>
                  <p className="text-sm text-gray-400">{exp.duration}</p>
                  <p className="mt-2 text-gray-700">{exp.responsibility}</p>
                </div>
              ))}
            </section>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-blue-700">
                Education
              </h2>
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="mt-3 p-4 border border-gray-200 rounded-lg shadow-sm"
                >
                  <h3 className="text-lg font-bold">{edu.degree}</h3>
                  <p className="text-gray-500">
                    {edu.university} • {edu.location}
                  </p>
                  <p className="text-sm text-gray-400">
                    🎓 Graduation: {edu.graduationYear}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-blue-700">Projects</h2>
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="mt-3 p-4 border border-gray-200 rounded-lg shadow-sm"
                >
                  <h3 className="text-lg font-bold">{proj.title}</h3>
                  <p className="text-gray-700">{proj.description}</p>
                  {proj.technologiesUsed && (
                    <p className="text-sm text-gray-500">
                      🛠 {renderTechnologies(proj.technologiesUsed)}
                    </p>
                  )}
                  {proj.githubLink && (
                    <a
                      href={proj.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      🔗 GitHub
                    </a>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Achievements Section */}
          {achievements.filter((a) => a?.title).length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-blue-700">
                Achievements
              </h2>
              {achievements
                .filter((a) => a?.title)
                .map((ach, idx) => (
                  <div
                    key={idx}
                    className="mt-3 p-4 border border-gray-200 rounded-lg shadow-sm"
                  >
                    <h3 className="text-lg font-bold">{ach.title}</h3>
                    {ach.year && <p className="text-gray-500">{ach.year}</p>}
                    {ach.extraInformation && (
                      <p className="text-gray-700">{ach.extraInformation}</p>
                    )}
                  </div>
                ))}
            </section>
          )}

          {/* Languages Section */}
          {languages.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-blue-700">
                Languages
              </h2>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {languages.map((lang, idx) => (
                  <li key={idx}>{lang.name || lang}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Interests Section */}
          {interests.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-blue-700">
                Interests
              </h2>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {interests.map((int, idx) => (
                  <li key={idx}>{int.name || int}</li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-6 print:hidden">
        <button onClick={handleDownloadPdf} className="btn btn-primary">
          Download PDF
        </button>
        <button onClick={handlePrint} className="btn btn-secondary">
          Print / Save as PDF
        </button>
      </div>
    </>
  );
};

import PropTypes from "prop-types";

Resume.propTypes = {
  data: PropTypes.object,
};

export default Resume;
