import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { styled, Box, Card, Typography } from '@mui/material';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Link from "next/link";
import './DubaiAreasShowcase.css';
import { Pagination, Navigation, Autoplay } from 'swiper';

const BvAreaCard = styled(Card)({
  position: 'relative',
  borderRadius: '24px',
  overflow: 'hidden',
  width: '100%',
  height: '460px',
  cursor: 'pointer',
  border: 'none',
  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
  '&:hover': {
    transform: 'translateY(-15px)',
    boxShadow: '0 30px 60px rgba(189, 144, 136, 0.3)',
    '& .bv-area-bg-img': {
      transform: 'scale(1.15)',
    },
    '& .bv-area-card-overlay': {
      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
    },
    '& .bv-area-cta-text': {
      opacity: 1,
      transform: 'translateY(0)',
    }
  },
});

const BvAreaImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  left: 0,
  transition: 'transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)',
});

const BvAreaOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)',
  zIndex: 1,
  transition: 'all 0.5s ease',
});

const BvAreaInfo = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '30px',
  color: 'white',
  zIndex: 2,
  textAlign: 'left',
});

const areasData = [
  { id: 1, name: 'Dubai Marina', listings: '247 listings', image: '/DubaiMarina.jpg' },
  { id: 2, name: 'Downtown Dubai', listings: '109 listings', image: '/downtowndubai.jpg' },
  { id: 3, name: 'Palm Jumeirah', listings: '72 listings', image: '/palmjumeirah.jpg' },
  { id: 4, name: 'Jumeirah Beach', listings: '83 listings', image: '/JumeirahBeachResidence.jpg' },
  { id: 5, name: 'Business Bay', listings: '123 listings', image: '/listproperty.jpeg' },
  { id: 6, name: 'DIFC', listings: '123 listings', image: '/DIFC.jpg' },
  { id: 7, name: 'Dubailand', listings: '123 listings', image: '/Dubailand.jpg' },
];

function DubaiAreasShowcase() {
  return (
    <div className="bv-area-section-root">
      <Box className="bv-area-text-center">
        <Typography variant="overline" className="bv-area-overline">
          Explore the Elite
        </Typography>
        <Typography variant="h2" className="bv-area-main-heading">
          Holiday Areas in <span className="bv-area-italic">Dubai</span>
        </Typography>
        <div className="bv-area-title-divider"></div>
      </Box>

      <div className="bv-area-slider-container">
        {/* Custom Navigation Elements */}
        <div className="bv-area-nav-wrapper">
          <div className="bv-area-arrow bv-area-prev">
             <span className="bv-area-icon-left"></span>
          </div>
          <div className="bv-area-arrow bv-area-next">
             <span className="bv-area-icon-right"></span>
          </div>
        </div>

        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          grabCursor={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation={{
            nextEl: '.bv-area-next',
            prevEl: '.bv-area-prev',
          }}
          pagination={{ el: '.bv-area-pagination-custom', clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1400: { slidesPerView: 4 },
          }}
          className="bv-area-swiper-instance"
        >
          {areasData.map((area) => (
            <SwiperSlide key={area.id}>
              <Link legacyBehavior href={`/area`} passHref>
                <BvAreaCard>
                  <BvAreaImage src={area.image} alt={area.name} className="bv-area-bg-img" />
                  <BvAreaOverlay className="bv-area-card-overlay" />
                  <BvAreaInfo>
                    <Typography variant="h5" className="bv-area-name">
                      {area.name}
                    </Typography>
                    <Typography variant="body2" className="bv-area-listings">
                      {area.listings}
                    </Typography>
                    <Typography variant="caption" className="bv-area-cta-text">
                      View Properties <span>→</span>
                    </Typography>
                  </BvAreaInfo>
                </BvAreaCard>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Box className="bv-area-bottom-controls">
        <div className="bv-area-pagination-custom"></div>
        <Link href="/property">
          <button className="bv-area-btn-luxury">
            Discover All Areas
          </button>
        </Link>
      </Box>
    </div>
  );
}

export default DubaiAreasShowcase;