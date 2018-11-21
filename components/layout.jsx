import Topbar from "./topbar"
import Footer from "./footer"


const Layout = (props) => (
  <>
    <Topbar />
    <div className="albert-topbar-avoidance">{props.children}</div>
    <Footer />

    <style jsx>{`
      .albert-topbar-avoidance {
        margin-top: 56px;
      }
    `}</style>
  </>
)


export default Layout
