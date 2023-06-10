import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <nav className="navbar navbar-expand-sm navbar-dark bg-white shadow-sm">
              <a className="navbar-brand" href="#">Navbar</a>
              <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                  aria-expanded="false" aria-label="Toggle navigation"></button>
              <div className="collapse navbar-collapse" id="collapsibleNavId">
                  <ul className="navbar-nav me-auto mt-2 mt-lg-0 text-secondary">
                      <li className="nav-item">
                          <a className="nav-link active fw-bold text-secondary" href="#" aria-current="page">DAO <span className="visually-hidden">(current)</span></a>
                      </li>
                  </ul>
                  <form className="d-flex my-2 my-lg-0 px-2">
                      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">connect wallet</button>
                  </form>
              </div>
          </nav>
          <div className='container mt-5'>
            <div className='row justify-content-center align-items-center'>
              <div className='col col-md-3'>
                  <p>Opened Proposals : </p>
              </div>
              <div className='col col-md-3'>
                  DAO Available Balance : 
              </div>
              <div className='col col-md-3'>
                  Personal Contributions :
              </div>
              <div className='col col-md-3'>
                Status : stakeholder
              </div>
            </div>
          </div>
        </div>

        <section id="products" className="departments">
      <div className="container">

        <div className="section-title" data-aos="zoom-in-up" data-aos-duration="800" data-aos-easing="linear">
          <h2>Proposals State</h2>
          <p> Below shows different states of proposals.</p>
        </div>

        <div className="row">
          <div className="col-lg-3">
            <ul className="nav nav-tabs flex-column">
              <li className="nav-item">
                <a className="nav-link active show" data-toggle="tab" href="#tab-1">All</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#tab-2">Opened</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#tab-3">Closed</a>
              </li>
        
            </ul>
          </div>
          <div className="col-lg-9 mt-4 mt-lg-0">
            <div className="tab-content">
              <div className="tab-pane active show" id="tab-1">
                <div className="row">
                  <div className="col-lg-8 details order-2 order-lg-1">
                    <h3>Blackseed</h3>
                    <p className="font-italic">Blackseed (nigella sativa) also called black cumin, 
                      black caraway, black onion seed contains some chemical compounds known as thymoquinone and caryophyllene.</p>
                    <p>It has been used for medical cares since thousands of years back. It is good for medical Conditions
                      such as <b>asthma, high blood pressure, diabetes, inflammation, eczema, flu, fever, headache, skin care.</b> etc.
                       <i>We have it in form of powder, oil(virgin and extra virgin) and seed.</i>
                    </p>
                  </div>
                  <div className="col-lg-4 text-center order-1 order-lg-2">
                    {/* <Image src="assets/img/blackseed.jpeg" alt="" className="img-fluid"/> */}
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="tab-2">
                <div className="row">
                  <div className="col-lg-8 details order-2 order-lg-1">
                    <h3>Olive</h3>
                    <p className="font-italic">Olive belongs to the group of fruits known as DRUPES.</p>
                    <p>It is very high in vitamin E, fibre and other powerful antioxidants.
                       It protects against osteoporosis and Cancer and also serves as pain reduction and apetite control.
                        <i>Available in seeds, oil and powder.</i>
                      </p>
                  </div>
                  <div className="col-lg-4 text-center order-1 order-lg-2">
                    {/* <Image src="assets/img/olive.jpeg" alt="olive oil" className="img-fluid" /> */}
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="tab-3">
                <div className="row">
                  <div className="col-lg-8 details order-2 order-lg-1">
                    <h3>Garlic</h3>
                    <p className="font-italic">Eos voluptatibus quo. Odio similique illum id quidem non enim fuga. Qui natus non sunt dicta dolor et. In asperiores velit quaerat perferendis aut</p>
                    <p>Iure officiis odit rerum. Harum sequi eum illum corrupti culpa veritatis quisquam. Neque necessitatibus illo rerum eum ut. Commodi ipsam minima molestiae sed laboriosam a iste odio. Earum odit nesciunt fugiat sit ullam. Soluta et harum voluptatem optio quae</p>
                  </div>
                  <div className="col-lg-4 text-center order-1 order-lg-2">
                    {/* <Image src="assets/img/garlic.jpeg" alt="garlic oil" className="img-fluid" /> */}
                  </div>
                </div>
              </div>
          
            </div>
          </div>
        </div>

      </div>
    </section>
      </main>
    </>
  )
}
