
function Hero({data}){
   

    return (
        <>

         <div className="Hero-container">
            <div className="Hero-title">
                <h1>
                   {data.title}
                </h1>
                <p>
                     The Pinnacle Super Specialty Hospital in the Shalimar Bagh region in Delhi is one of the most reputed 
                     super-specialty hospitals in the country having around 300 beds and offering specialized treatment 
                     services to patients in all major medical disciplines. The various disciplines that Pinnacle hospital in Shamilar Bagh specializes are Cardiology, Neurosciences, Oncology, Minimal Access Metabolic Surgery, Joint Replacement, Bariatric Surgery, Nephrology, Trauma, and Critical Care, Orthopaedics, Urology, Kidney Transplant, etc. The hospital at Shalimar Bagh is regarded as one of the best medical institutes in Delhi and also within the country, with more than four lakhs of patients who have undergone successful treatments.

                </p>
            </div>
            <div className="heroImg">
                <img src={data.imgUrl} /> 
            </div>
         </div>

        
        
        </>
    )

}

export default Hero;