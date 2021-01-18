import axios from "axios";

const service = axios.create({
      baseURL: 'http://localhost:4000/api',
      // baseURL: process.env.REACT_APP_BACKEND_URL+'api',
      withCredentials: true,
});

function errorHandler(error) {
      if (error.response) {
            console.log(error.response.data.message);
            throw error.response.data;
      }
      throw error;
}

export default {
      service,
      //*******/ 
      // Auth
      //*******/ 
      signup(userInfo) {
            return service
                  .post("/auth/signup", userInfo)
                  .then((res) => res.data)
                  .catch(errorHandler);
      },

      login(userInfo) {
            return service
                  .post("/auth/login", userInfo)
                  .then((res) => res.data)
                  .catch(errorHandler);
      },

      logout() {
            return service.delete("/auth/logout").catch(errorHandler);
      },

      isLoggedIn() {
            return service
                  .get("/auth/isLoggedIn")
                  .then((res) => res.data)
                  .catch(errorHandler);
      },

      updateProfile(data) {
            return service
                  .patch("/auth/update", data)
                  .then((res) => res.data)
                  .catch(errorHandler);
      },

      getProfile() {
            return service
                  .get("/auth/profile")
                  .then((res) => res.data)
                  .catch(errorHandler);
      },
      //*******/ 
      // Announcement
      //*******/ 
      createAnnouncement(data) {
            return service
                  .post("/announcements/new", data)
                  .then((res) => res.data)
                  .catch(errorHandler);
      },
      getOneAnnouncement(id) {
            return service
                  .get(`/announcements/one/${id}`)
                  .then((res) => res.data)
                  .catch(errorHandler);
      },
      updateOneAnnouncement(data, id) {
            return service
                  .patch(`/announcements/update/${id}`, data)
                  .then((res) => res.data)
                  .catch(errorHandler);
      },
      deleteOneAnnouncement(id) {
            return service
                  .delete(`/announcements/delete/${id}`)
                  .then((res) => res.data)
                  .catch(errorHandler);
      },
      getAnnouncementsByAuthor(id) {
            return service
                  .get(`/announcements/author/${id}`)
                  .then((res) => res.data)
                  .catch(errorHandler);
      },
      //*******/ 
      // Review
      //*******/
      addReview(data, id) {
            return service
                  .post(`/reviews/create/${id}`, data)
                  .then((res) => res.data)
                  .catch(errorHandler);
      },

      //*******/ 
      // Provider
      //*******/
      //Added to favorite list
      addToFavoriteList(idProvider) {
            return service
                  .post(`/providers/favorite/${idProvider}`)
                  .then((res) => res.data)
                  .catch(errorHandler);
      },

      takeOffFavoriteList(idProvider) {
            return service
                  .post(`/providers/no-favorite/${idProvider}`)
                  .then((res) => res.data)
                  .catch(errorHandler);
      },

      getOneProvider(idProvider, limit) {
            return service
                  .get(`/providers/one/${idProvider}?limit=${limit}`)
                  .then((res) => res.data)
                  .catch(errorHandler);
      },
      //Send a booking request
      sendBookingRequest(idProvider) {
            return service
                  .post(`/providers/booking/${idProvider}`)
                  .then((res) => res.data)
                  .catch(errorHandler);
      },
      cancelBookingRequest(idProvider) {
            return service
                  .post(`/providers/no-booking/${idProvider}`)
                  .then((res) => res.data)
                  .catch(errorHandler);
      },
      //USER

};