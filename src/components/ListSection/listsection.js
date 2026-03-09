import React from 'react';
import styles from './listsection.css'; // Ensure this is the correct path
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
const PropertyManagementSection = () => {
  const services = [
    {
      title: 'Listing & Marketing',
      description: "Craft an eye-catching listing with our industry experts; we cover the listing fees, so you don't have to worry.",
      icon: <MapsHomeWorkOutlinedIcon style={{ fontSize: 50 }} />,
    },
    {
      title: 'Interior Design',
      description: 'Increase your booking rate by 12% with our dedicated designers; customize interiors for higher returns.',
      icon: <WeekendOutlinedIcon style={{ fontSize: 50 }} />,
    },
    {
      title: 'Professional Photography',
      description: "Elevate your property's appeal with professional photos, 350 virtual tours, and captivating video content.",
      icon: <PhotoCameraOutlinedIcon style={{ fontSize: 50 }} />,
    },
    {
      title: 'Initial Property Setup​',
      description: "Get a rental income projection and DTCM-ready setup after the initial property visit.",
      icon: <SupervisorAccountOutlinedIcon style={{ fontSize: 50 }} />,
    },
    {
      title: 'Property Maintenance',
      description: "Skilled technicians handle routine maintenance and repairs at discounted rates; no markups on invoices.",
      icon: <EngineeringOutlinedIcon style={{ fontSize: 50 }} />,
    },
    {
      title: 'Housekeeping',
      description: "Enjoy round-the-clock housekeeping services; we take care of everything so you can relax.",
      icon: <CleaningServicesOutlinedIcon style={{ fontSize: 50 }} />,
    },
    {
      title: 'Inquiries & Bookings',
      description: "Streamlined booking experience, 7 days a week; our team handles inquiries and confirms reservations.",
      icon: <PermContactCalendarOutlinedIcon style={{ fontSize: 50 }} />,
    },
    {
      title: 'Dedicated Owner Services',
      description: "Reach us anytime via phone or email if you have questions about your home.",
      icon: <AttachEmailOutlinedIcon style={{ fontSize: 50 }} />,
    },
    {
      title: 'Pricing Optimization',
      description: "Maximize income with the latest tools; we track revenue and occupancy to optimize rates.",
      icon: <AttachMoneyOutlinedIcon style={{ fontSize: 50 }} />,
    },
  ];

  return (
    <section className={`${styles.propertySection} text-center`}>
      <h2 className="mb-5 heading-start pt-5" >Property Management Services</h2>
      <div className="container">
        <div className="row">
          {services.map((service, index) => (
            <div className="col-md-4 service-card " key={index}>
              <div className={styles.card}>
                <div className="iconContainer">{service.icon}</div>
                <h3 className="mt-3 h3list">{service.title}</h3>
                <p className="mt-2 plist">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyManagementSection;
