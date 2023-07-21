import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import { faqsData } from '../../utils/homeUtil';
import { Add, Close } from '@mui/icons-material';
import classes from "../../styles/home.module.css";
import { getLanguage } from '../../services/authService';
import language from '../../languages/langIndex';
import GetStarted from './getStarted';
import dynamic from "next/dynamic";

function Faq() {
  const globalLanguage = getLanguage();
  const languageText = language[globalLanguage || "en"];
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box className="clearFix">
      <Typography className={`${classes.title} title`}>{languageText?.FREQUENTLY_ASKED_QUESTIONS}</Typography>
      <Box mb={4} >
        {faqsData.map((faq, index) => {
          return <Box key={index}>
            <Accordion className={`${classes.accordion} faq-accordion`} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
              <AccordionSummary
                expandIcon={expanded === `panel${index}` ? <Close className={classes.accordionIcon} /> : <Add className={classes.accordionIcon} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className='subTitle' sx={{ width: '80%', flexShrink: 0, textAlign: "left !important" }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails >
                <Typography className='subTitle' style={{ whiteSpace: "pre-line", textAlign: "left !important" }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        })}
      </Box>
      <GetStarted />
    </Box>
  )
}

export default dynamic(() => Promise.resolve(Faq), { ssr: false });