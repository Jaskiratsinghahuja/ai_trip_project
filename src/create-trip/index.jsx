import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { motion } from "framer-motion";
import {
  AI_PROMPT,
  selectBudgetOption,
  SelectTraveleslist,
} from "@/constant/options";
import { toast } from "sonner";
import { chatSession } from "@/service/AImodel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseconfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Createtrip() {
  const [place, setPlace] = useState(null);
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState(null);
  const [travelCompanion, setTravelCompanion] = useState(null);
  const [formData, setFormData] = useState({});
  const [googleApiLoaded, setGoogleApiLoaded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const selectedStyle = {
    backgroundColor: "#ffcc00", // Yellow background
    color: "#333", // Dark text
   
  };

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_PLACES_API_KEY
      }&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google Maps API loaded successfully.");
        setGoogleApiLoaded(true);
      };
      script.onerror = () => console.error("Failed to load Google Maps API.");
      document.body.appendChild(script);
    } else {
      setGoogleApiLoaded(true);
    }
  }, []);

  const handleInputChange = (name, value) => {
    if (name === "days" && value > 5) {
      toast.error("Please plan your trip within 5 days or less.");
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log("Login Success:", codeResp);
      GetUserProfile(codeResp);
    },
    onError: (error) => {
      console.error("Login Error:", error);
      toast.error("Failed to sign in with Google.");
    },
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log("User Profile:", resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      })
      .catch((error) => {
        console.error(
          "Error fetching user profile:",
          error.response ? error.response.data : error.message
        );
        toast.error("Failed to fetch user profile. Please try again.");
      });
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    console.log("Saving trip data:", {
      userSelection: formData,
      tripData: TripData,
      userEmail: user?.email,
      id: docId,
    });

    try {
      await setDoc(doc(db, "AITrip", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId,
      });
      console.log("Trip saved successfully.");
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Failed to save trip. Please try again.");
    }
    setLoading(false);
    navigate('/view-trp/'+docId)
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.location ||
      !formData?.days ||
      !formData?.budget ||
      !formData?.travelCompanion
    ) {
      toast.error("Please fill all the form details.");
      return;
    }

    if (formData.days > 5) {
      toast.error("Please plan your trip within 5 days or less.");
      return;
    }
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location || "Unknown Location"
    )
      .replace("{totaldays}", formData?.days || "Unknown Days")
      .replace("{traveler}", formData?.travelCompanion || "Unknown Traveler")
      .replace("{budget}", formData?.budget || "Unknown Budget");

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response?.text());
      setLoading(false);
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip. Please try again.");
    }
  };

  return (
    <div
    className="bg-cover bg-center min-h-screen p-6 bg-transparent"
    style={{ backgroundImage: "url('/beach.jpg')",  width:"100vw"}}
  >
    <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="pt-20 sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 min-h-screen flex flex-col justify-start items-center text-center"
  /*style={{ backgroundColor: "#e0f7fa" , width:"100vw" }} // Light sky blue color*/
 
>
   
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pt-20 sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 min-h-screen flex flex-col justify-start items-center text-center"
    >
      <motion.h2
        className="text-4xl my-3 font-bold"
        initial={{ scale: 1.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        Tell me your Preferences⛷️
      </motion.h2>

      <motion.p
        className=" text-white
        -600 text-3xl my-3 font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 2 }}
      >
        Tell me about your trip, and our planner will generate a customized
        itinerary.🏝️
      </motion.p>

      <motion.div
        className="mt-10 flex flex-col gap-9 w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {/* Destination Input */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="w-full"
        >
          <h2 className="text-4xl my-3 font-bold">
            What is your destination?🗾
          </h2>
          {googleApiLoaded ? (
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
              selectProps={{
                value: place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v.label);
                },
                placeholder: "Enter your destination...",
              }}
            />
          ) : (
            <p className="text-red-500">Loading Google Places...</p>
          )}
        </motion.div>

        {/* Number of Days Input */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="w-full"
        >
          <h2 className="text-4xl my-3 font-bold">
            How many days are you planning?🚵
          </h2>
          <input
            type="number"
            placeholder="Ex: 3"
            value={days}
            onChange={(e) => {
              setDays(e.target.value);
              handleInputChange("days", e.target.value);
            }}
            className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </motion.div>

        {/* Budget Selection */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="w-full"
        >
          <h2 className="text-4xl my-3 font-bold">What is your Budget?</h2>

          <div className="grid grid-cols-3 gap-3 mt-5">
            {selectBudgetOption.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.85 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 border rounded-lg cursor-pointer font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 
                ${
                  budget === item.title
                    ? "border-4 border-black shadow-lg"
                    : "border-gray-300"
                }`}
                onClick={() => {
                  setBudget(item.title);
                  handleInputChange("budget", item.title);
                }}
              >
                <h2>{item.icon}</h2>
                <h2 className="font-semibold text-2xl">{item.title}</h2>
                <h2 className="text-gray-500 font-light">{item.desc}</h2>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Travel Companion Selection */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="w-full"
        >
          <h2 className="text-4xl my-3 font-bold">
            Who do you plan on traveling with?🎫
          </h2>
          <div className="grid grid-cols-3 gap-3 mt-5">
            {SelectTraveleslist.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.85 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 border rounded-lg cursor-pointer font-semibold bg-gradient-to-r from-blue-500 to-purple-500 
                ${
                  travelCompanion === item.title
                    ? "border-4 border-black shadow-lg"
                    : "border-gray-300"
                }`}
                onClick={() => {
                  setTravelCompanion(item.title);
                  handleInputChange("travelCompanion", item.title);
                }}
              >
                <h2>{item.icon}</h2>
                <h2 className="font-semibold text-2xl">{item.title}</h2>
                <h2 className="text-gray-500 font-light">{item.desc}</h2>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div className="my-20 flex justify-end">
          <motion.button
            disabled={loading}
            whileHover={{ scale: 1.85 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg border-2"
            onClick={onGenerateTrip} // Call onGenerateTrip on button click
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </motion.button>
        </motion.div>
      </motion.div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/vite.svg" alt="Logo" className="w-40 h-auto" />
              <h2 className="font-bold text-black text-xl mt-7">
                SignIn with Google
              </h2>
              <p>Sign in to the app with google authentication</p>
              <button
                onClick={login}
                className=" mt-5 w-full border-spacing-1 justify-center backdrop-blur-md bg-black text-white border border-white px-4 py-2 rounded w"
              >
                <FaGoogle className="h-5 w-10" />
                Sign in with Google
              </button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </motion.div>
    </motion.div>
  </div>
  );
}

export default Createtrip;