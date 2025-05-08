export default function PageHeader({ title, description, sectionLabel }) {
  return (
    <div className="w-full py-16 section-gradient-1 gradient-section text-center">
      <div className="main-container">
        {sectionLabel && (
          <span className="text-sm uppercase tracking-wider text-blue-500 dark:text-blue-300">
            {sectionLabel}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold heading-apple text-apple-darkgray dark:text-white my-6">
          {title}
        </h1>
        {description && (
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
