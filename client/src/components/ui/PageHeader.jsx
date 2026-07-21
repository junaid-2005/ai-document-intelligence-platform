function PageHeader({
  title,
  description,
  action,
}) {
  return (
    <div
      className="
      flex
      flex-col
      md:flex-row
      md:items-center
      md:justify-between
      gap-5
      "
    >
      <div>

        <h1 className="text-4xl font-bold">
          {title}
        </h1>

        {description && (
          <p className="text-slate-500 mt-2">
            {description}
          </p>
        )}

      </div>

      {action && action}

    </div>
  );
}

export default PageHeader;