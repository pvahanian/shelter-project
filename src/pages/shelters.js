import React from "react"
import shelter_info from "../components/shelter_info";

const shelters = () => (
    <div className="shelters">
      <shelter_info
          Name={"Example Shelter "}
          address={"Green Eggs and Ham Avenue, Portland, OR 97660"}
          website={"google.com"}
          resources={["Housing", "Clothing", "Medical Services",]}
          contact={"(503)-123-4567"}
          />

    </div>
)



export default shelters;