import PropTypes from "prop-types";
import { useRef } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

// Example: Professional Gray Resume Template
function ResumeTemplate3({ data }) {
  const resumeRef = useRef(null);

  const {
    personalInformation = {},
    summary = "",
    skills = [],
    experience = [],
    education = [],
    certifications = [],
    projects = [],
    achievements = [],
    languages = [],
    interests = [],
  } = data || {};

  const renderTechnologies = (tech) => {
    if (!tech) return "";
    if (Array.isArray(tech)) return tech.join(", ");
    if (typeof tech === "string") return tech;
    return "";
  };

  const handleDownloadPdf = () => {
    if (!resumeRef.current) return;
    const fileName = prompt(
      "Enter a file name for your resume:",
      data?.personalInformation?.fullName || "resume"
    );
    if (!fileName) return;
    toPng(resumeRef.current, { quality: 1.0, backgroundColor: "#ffffff" })
      .then((dataUrl) => {
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${fileName}.pdf`);
      })
      .catch((err) => console.error("Error generating PDF", err));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div
        ref={resumeRef}
        className="max-w-5xl mx-auto shadow-2xl rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-3 bg-gray-100 text-gray-900 border border-gray-300 print:border-0 print:shadow-none"
      >
        {/* SIDEBAR / PROFILE CARD */}
        <aside className="bg-gradient-to-b from-gray-300 to-gray-400 p-6 space-y-6 md:min-h-full flex flex-col items-center">
          {/* Profile Photo */}
          {personalInformation.profilePhoto && (
            <div className="flex justify-center mb-4">
              <img
                src={personalInformation.profilePhoto}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-500 shadow-lg"
              />
            </div>
          )}
          {/* Name & Location */}
          <div className="text-center mb-2">
            <h1 className="text-2xl font-bold leading-tight">
              {personalInformation.fullName || "Your Name"}
            </h1>
            <p className="text-gray-700 mt-1">
              {personalInformation.location || "City, Country"}
            </p>
          </div>
          {/* Contact Section */}
          <div className="space-y-2 text-sm text-gray-800">
            {personalInformation.email && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-purple-700">✉️</span>{" "}
                {personalInformation.email}
              </div>
            )}
            {personalInformation.phoneNumber && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-pink-600">📞</span>{" "}
                {personalInformation.phoneNumber}
              </div>
            )}
            {personalInformation.gitHub && (
              <a
                href={personalInformation.gitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <span className="font-semibold text-yellow-600">🐙</span> GitHub
              </a>
            )}
            {personalInformation.linkedin && (
              <a
                href={personalInformation.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <span className="font-semibold text-blue-700">🔗</span> LinkedIn
              </a>
            )}
            {personalInformation.portfolio && (
              <a
                href={personalInformation.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <span className="font-semibold text-green-700">🌐</span>{" "}
                Portfolio
              </a>
            )}
          </div>
          {/* Skills Section */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow"
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
              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">
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

        {/* MAIN CONTENT */}
        <main className="md:col-span-2 p-6 space-y-8">
          {/* Summary Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Summary
            </h2>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-700">{summary}</p>
            </div>
          </section>

          {/* Experience Section */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
                  >
                    <h3 className="text-lg font-bold">{exp.jobTitle}</h3>
                    <p className="text-gray-500">
                      {exp.company} • {exp.location}
                    </p>
                    <p className="text-sm text-gray-400">{exp.duration}</p>
                    <p className="mt-2 text-gray-700">{exp.responsibility}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
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
              </div>
            </section>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
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
              </div>
            </section>
          )}

          {/* Achievements Section */}
          {achievements.filter((a) => a?.title).length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Achievements
              </h2>
              <div className="space-y-4">
                {achievements
                  .filter((a) => a?.title)
                  .map((ach, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
                    >
                      <h3 className="text-lg font-bold">{ach.title}</h3>
                      {ach.year && <p className="text-gray-500">{ach.year}</p>}
                      {ach.extraInformation && (
                        <p className="text-gray-700">{ach.extraInformation}</p>
                      )}
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Languages Section */}
          {languages.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
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
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
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
      <div className="flex justify-center gap-4 mt-6 print:hidden">
        <button
          onClick={handleDownloadPdf}
          className="btn"
          style={{ background: "#29b6f6", color: "#222" }}
        >
          Download PDF
        </button>
        <button
          onClick={handlePrint}
          className="btn"
          style={{ background: "#7986cb", color: "#222" }}
        >
          Print / Save as PDF
        </button>
      </div>
    </>
  );
}

ResumeTemplate3.propTypes = {
  data: PropTypes.object,
};

export default ResumeTemplate3;
