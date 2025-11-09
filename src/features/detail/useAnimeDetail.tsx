import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AnimeSummary } from "../../types/anime";

interface UseAnimeDetailReturn {
  /*======================== Props ======================== */
  anime: AnimeSummary | null;
  isLoading: boolean;
  error: string | null;
  errorType: "network" | "notFound" | "rateLimit" | "server" | "generic" | null;
  showFloatBackButton: boolean;
  retry: () => void;
  handleBack: () => void;
}

const useAnimeDetail = (): UseAnimeDetailReturn => {
  /*======================== Props ======================== */
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // To navigate to the updated URL

  /*======================== UseState ======================== */
  const [anime, setAnime] = useState<AnimeSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<
    "network" | "notFound" | "rateLimit" | "server" | "generic" | null
  >(null);
  const [showFloatBackButton, setShowFloatBackButton] = useState(false);

  /*======================== Handler ======================== */

  // Fetch anime details
  const fetchAnimeDetail = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      setError(null);
      setErrorType(null);

      const response = await axios.get(
        `https://api.jikan.moe/v4/anime/${id}/full`
      );
      setAnime(response.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 429) {
          setError(
            "The anime API is currently busy. Please try again in a moment."
          );
          setErrorType("rateLimit");
        } else if (status && status >= 500) {
          setError(
            "The anime API is experiencing issues. Please try again later."
          );
          setErrorType("server");
        } else if (status === 404) {
          setError("Anime not found.");
          setErrorType("notFound");
        } else {
          setError(
            "Failed to fetch anime details. Please check your connection."
          );
          setErrorType("network");
        }
      } else {
        setError("An unexpected error occurred.");
        setErrorType("generic");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Retry function
  const retry = () => {
    fetchAnimeDetail();
  };

  const handleBack = () => {
    navigate(-1);
  };

  /*======================== UseEffect ======================== */

  // Handle scroll to show/hide floating back button on mobile
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const showPosition = 200; // Show floating back button after scrolling 200px
      const isMobile = window.innerWidth < 768; // Only on mobile screens
      setShowFloatBackButton(isMobile && scrollY > showPosition);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll); // Check on resize too

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchAnimeDetail();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  /*======================== Return ======================== */
  return {
    anime,
    isLoading,
    error,
    errorType,
    showFloatBackButton,
    retry,
    handleBack,
  };
};

export default useAnimeDetail;
