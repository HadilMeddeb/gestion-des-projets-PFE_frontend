import React from "react";
import "./css/style.css";

function Home() {
  return (
<div>
  {/* Sub Header */}
  <div className="sub-header">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-sm-8">
          <div className="left-content">
            <p>This is an educational <em>HTML CSS</em> template by TemplateMo website.</p>
          </div>
        </div>
        <div className="col-lg-4 col-sm-4">
          <div className="right-icons">
            <ul>
              <li><a href="#"><i className="fa fa-facebook" /></a></li>
              <li><a href="#"><i className="fa fa-twitter" /></a></li>
              <li><a href="#"><i className="fa fa-behance" /></a></li>
              <li><a href="#"><i className="fa fa-linkedin" /></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* ***** Header Area Start ***** */}
  <header className="header-area ">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="main-nav">
            {/* ***** Logo Start ***** */}
            <a href="index.html" className="logo">
              EDUIX
            </a>
            {/* ***** Logo End ***** */}
            {/* ***** Menu Start ***** */}
            <ul className="nav">
              <li className="scroll-to-section"><a href="#top" className="active">Home</a></li>
              <li><a href="meetings.html">Meetings</a></li>
              <li className="scroll-to-section"><a href="#apply">Apply Now</a></li>
              <li className="has-sub">
                <a href="#">Pages</a>
                <ul className="sub-menu">
                  <li><a href="meetings.html">Upcoming Meetings</a></li>
                  <li><a href="meeting-details.html">Meeting Details</a></li>
                </ul>
              </li>
              <li className="scroll-to-section"><a href="#courses">Courses</a></li> 
              <li className="scroll-to-section"><a href="#contact">Contact Us</a></li> 
            </ul>        
            <a className="menu-trigger">
              <span>Menu</span>
            </a>
            {/* ***** Menu End ***** */}
          </nav>
        </div>
      </div>
    </div>
  </header>
  {/* ***** Header Area End ***** */}
  {/* ***** Main Banner Area Start ***** */}
  <section className="section main-banner" id="top" data-section="section1">
    <video autoPlay muted loop id="bg-video">
      <source src="assets/images/course-video.mp4" type="video/mp4" />
    </video>
    <div className="video-overlay header-text">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="caption text-start">
              <h6>Hello Students</h6>
              <h2>Welcome to Education</h2>
              <p>This is an edu meeting HTML CSS template provided by <a rel="nofollow" href="https://templatemo.com/page/1" target="_blank">TemplateMo website</a>. This is a Bootstrap v5.1.3 layout. The video background is taken from Pexels website, a group of young people by <a rel="nofollow" href="https://www.pexels.com/@pressmaster" target="_blank">Pressmaster</a>.</p>
              <div className="main-button-red">
                <div className="scroll-to-section"><a href="#contact">Join Us Now!</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


<section className="meetings-page" id="meetings">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-12">
            <div className="filters">
              <ul>
                <li data-filter="*" className="active">All Meetings</li>
                <li data-filter=".soon">Soon</li>
                <li data-filter=".imp">Important</li>
                <li data-filter=".att">Attractive</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row grid">
              <div className="col-lg-4 templatemo-item-col all soon">
                <div className="meeting-item">
                  <div className="thumb">
                    <div className="price">
                      <span>$14.00</span>
                    </div>
                    <a href="meeting-details.html"><img src="assets/images/meeting-01.jpg" alt /></a>
                  </div>
                  <div className="down-content">
                    <div className="date">
                      <h6>Nov <span>12</span></h6>
                    </div>
                    <a href="meeting-details.html"><h4>New Lecturers Meeting</h4></a>
                    <p>Morbi in libero blandit lectus<br />cursus ullamcorper.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 templatemo-item-col all imp">
                <div className="meeting-item">
                  <div className="thumb">
                    <div className="price">
                      <span>$22.00</span>
                    </div>
                    <a href="meeting-details.html"><img src="assets/images/meeting-02.jpg" alt /></a>
                  </div>
                  <div className="down-content">
                    <div className="date">
                      <h6>Nov <span>14</span></h6>
                    </div>
                    <a href="meeting-details.html"><h4>Online Teaching Techniques</h4></a>
                    <p>Morbi in libero blandit lectus<br />cursus ullamcorper.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 templatemo-item-col all soon">
                <div className="meeting-item">
                  <div className="thumb">
                    <div className="price">
                      <span>$24.00</span>
                    </div>
                    <a href="meeting-details.html"><img src="assets/images/meeting-03.jpg" alt /></a>
                  </div>
                  <div className="down-content">
                    <div className="date">
                      <h6>Nov <span>16</span></h6>
                    </div>
                    <a href="meeting-details.html"><h4>Network Teaching Concept</h4></a>
                    <p>Morbi in libero blandit lectus<br />cursus ullamcorper.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 templatemo-item-col all att">
                <div className="meeting-item">
                  <div className="thumb">
                    <div className="price">
                      <span>$32.00</span>
                    </div>
                    <a href="meeting-details.html"><img src="assets/images/meeting-04.jpg" alt /></a>
                  </div>
                  <div className="down-content">
                    <div className="date">
                      <h6>Nov <span>18</span></h6>
                    </div>
                    <a href="meeting-details.html"><h4>Online Teaching Tools</h4></a>
                    <p>Morbi in libero blandit lectus<br />cursus ullamcorper.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 templatemo-item-col all att">
                <div className="meeting-item">
                  <div className="thumb">
                    <div className="price">
                      <span>$34.00</span>
                    </div>
                    <a href="meeting-details.html"><img src="assets/images/meeting-02.jpg" alt /></a>
                  </div>
                  <div className="down-content">
                    <div className="date">
                      <h6>Nov <span>22</span></h6>
                    </div>
                    <a href="meeting-details.html"><h4>New Teaching Techniques</h4></a>
                    <p>Morbi in libero blandit lectus<br />cursus ullamcorper.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 templatemo-item-col all imp">
                <div className="meeting-item">
                  <div className="thumb">
                    <div className="price">
                      <span>$45.00</span>
                    </div>
                    <a href="meeting-details.html"><img src="assets/images/meeting-03.jpg" alt /></a>
                  </div>
                  <div className="down-content">
                    <div className="date">
                      <h6>Nov <span>24</span></h6>
                    </div>
                    <a href="meeting-details.html"><h4>Technology Conference</h4></a>
                    <p>TemplateMo is the best website<br />when it comes to Free CSS.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 templatemo-item-col all imp att">
                <div className="meeting-item">
                  <div className="thumb">
                    <div className="price">
                      <span>$52.00</span>
                    </div>
                    <a href="meeting-details.html"><img src="assets/images/meeting-01.jpg" alt /></a>
                  </div>
                  <div className="down-content">
                    <div className="date">
                      <h6>Nov <span>27</span></h6>
                    </div>
                    <a href="meeting-details.html"><h4>Online Teaching Techniques</h4></a>
                    <p>Morbi in libero blandit lectus<br />cursus ullamcorper.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 templatemo-item-col all soon imp">
                <div className="meeting-item">
                  <div className="thumb">
                    <div className="price">
                      <span>$64.00</span>
                    </div>
                    <a href="meeting-details.html"><img src="assets/images/meeting-02.jpg" alt /></a>
                  </div>
                  <div className="down-content">
                    <div className="date">
                      <h6>Nov <span>28</span></h6>
                    </div>
                    <a href="meeting-details.html"><h4>Instant Lecture Design</h4></a>
                    <p>Morbi in libero blandit lectus<br />cursus ullamcorper.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 templatemo-item-col all att soon">
                <div className="meeting-item">
                  <div className="thumb">
                    <div className="price">
                      <span>$74.00</span>
                    </div>
                    <a href="meeting-details.html"><img src="assets/images/meeting-03.jpg" alt /></a>
                  </div>
                  <div className="down-content">
                    <div className="date">
                      <h6>Nov <span>30</span></h6>
                    </div>
                    <a href="meeting-details.html"><h4>Online Social Networking</h4></a>
                    <p>Morbi in libero blandit lectus<br />cursus ullamcorper.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 mb-5">
            <div className="pagination">
              <ul>
                <li><a href="#">1</a></li>
                <li className="active"><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#"><i className="fa fa-angle-right" /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>




  <section className="apply-now" id="apply">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 align-self-center">
          <div className="row">
            <div className="col-lg-12">
              <div className="item">
                <h3>APPLY FOR BACHELOR DEGREE</h3>
                <p>You are allowed to use this edu meeting CSS template for your school or university or business. You can feel free to modify or edit this layout.</p>
                <div className="main-button-red">
                  <div className="scroll-to-section"><a href="#contact">Join Us Now!</a></div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="item">
                <h3>APPLY FOR BACHELOR DEGREE</h3>
                <p>You are not allowed to redistribute the template ZIP file on any other template website. Please contact us for more information.</p>
                <div className="main-button-yellow">
                  <div className="scroll-to-section"><a href="#contact">Join Us Now!</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </section>

  <section className="our-facts">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-12">
              <h2>A Few Facts About Our University</h2>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-12">
                  <div className="count-area-content percentage">
                    <div className="count-digit">94</div>
                    <div className="count-title">Succesed Students</div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="count-area-content">
                    <div className="count-digit">126</div>
                    <div className="count-title">Current Teachers</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-12">
                  <div className="count-area-content new-students">
                    <div className="count-digit">2345</div>
                    <div className="count-title">New Students</div>
                  </div>
                </div> 
                <div className="col-12">
                  <div className="count-area-content">
                    <div className="count-digit">32</div>
                    <div className="count-title">Awards</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
        <div className="col-lg-6 align-self-center">
          <div className="video">
            <a href="https://www.youtube.com/watch?v=HndV87XpkWg" target="_blank"><img src="assets/images/play-icon.png" alt /></a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="contact-us" id="contact">
    <div className="container">
      <div className="row">
        <div className="col-lg-9 align-self-center">
          <div className="row">
            <div className="col-lg-12">
              <form id="contact" action method="post">
                <div className="row">
                  <div className="col-lg-12">
                    <h2>Let's get in touch</h2>
                  </div>
                  <div className="col-lg-4">
                    <fieldset>
                      <input name="name" type="text" id="name" placeholder="YOURNAME...*" required />
                    </fieldset>
                  </div>
                  <div className="col-lg-4">
                    <fieldset>
                      <input name="email" type="text" id="email" pattern="[^ @]*@[^ @]*" placeholder="YOUR EMAIL..." required />
                    </fieldset>
                  </div>
                  <div className="col-lg-4">
                    <fieldset>
                      <input name="subject" type="text" id="subject" placeholder="SUBJECT...*" required />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <textarea name="message" type="text" className="form-control" id="message" placeholder="YOUR MESSAGE..." required defaultValue={""} />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <button type="submit" id="form-submit" className="button">SEND MESSAGE NOW</button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="right-info">
            <ul>
              <li>
                <h6>Phone Number</h6>
                <span>010-020-0340</span>
              </li>
              <li>
                <h6>Email Address</h6>
                <span>info@meeting.edu</span>
              </li>
              <li>
                <h6>Street Address</h6>
                <span>Rio de Janeiro - RJ, 22795-008, Brazil</span>
              </li>
              <li>
                <h6>Website URL</h6>
                <span>www.meeting.edu</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="footer">
      <p>Copyright © 2022 Edu Meeting Co., Ltd. All Rights Reserved. 
        <br />Design: <a href="https://templatemo.com" target="_parent" title="free css templates">TemplateMo</a></p>
    </div>
  </section>
</div>


  );
}

export default Home;
