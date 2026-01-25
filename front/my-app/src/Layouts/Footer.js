const Footer = () => {
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p className="col-md-4 mb-0 text-muted">&copy; 2025 Zoe, theKim</p>

                <a href="/"
                   className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <svg className="bi me-2" width="40" height="32">

                    </svg>
                </a>

                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                    <li className="nav-item"><a href="/Users/varm/Source/web/front/my-app/src/Pages" className="nav-link px-2 text-muted">Home</a></li>
                    <li className="nav-item"><a href="my-app/src/Layouts/Footer#" className="nav-link px-2 text-muted">Features</a></li>
                    <li className="nav-item"><a href="my-app/src/Layouts/Footer#" className="nav-link px-2 text-muted">Pricing</a></li>
                    <li className="nav-item"><a href="my-app/src/Layouts/Footer#" className="nav-link px-2 text-muted">FAQs</a></li>
                    <li className="nav-item"><a href="my-app/src/Layouts/Footer#" className="nav-link px-2 text-muted">About</a></li>
                </ul>
            </footer>
        </div>
    )
}

export default Footer;