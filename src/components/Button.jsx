const Button = ({ text, className, id, href }) => {
  const handleClick = (e) => {
    if (href) {
      // If href is provided, navigate to that link
      return;
    }
    
    if (id) {
      e.preventDefault();
      const target = document.getElementById(id);
      
      if (target) {
        const offset = window.innerHeight * 0.15;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <a
      href={href || `#${id}`}
      onClick={handleClick}
      className={`${className ?? ""} cta-wrapper`}
    >
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="arrow" />
        </div>
      </div>
    </a>
  );
};

export default Button;