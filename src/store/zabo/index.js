import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  state: {
    zaboes: [],
    zaboesObject: {},
    zaboesPageCount: "",
    participatedZaboes: {
      founder: 1,
      location: "E3",
      content: "sparcs Recuriting",
      category: "R",
      apply: "E",
      payment: "F",
      created_time: "2018-06-25 15:02",
      updated_time: "2018-06-25 15:02",
      limit: 1000,
      posters: [
        { zabo: 1, image: "http://localhost:8000/media/posters/godfather.png" }
      ],
      comments: [
        {
          id: 1,
          author: 1,
          content: "first comment",
          created_time: "2018-06-25 15:03",
          updated_time: "2018-06-25 15:03",
          is_private: false,
          is_deleted: false,
          is_blocked: false,
          recomments: [
            {
              id: 1,
              content: "first recomment",
              created_time: "2018-06-25 15:03",
              updated_time: "2018-06-25 15:03",
              is_private: false,
              is_deleted: false,
              is_blocked: false,
              comment: 1,
              author: 1
            }
          ]
        },
        {
          id: 2,
          author: 1,
          content: "second comment",
          created_time: "2018-06-25 15:03",
          updated_time: "2018-06-25 15:03",
          is_private: false,
          is_deleted: false,
          is_blocked: false,
          recomments: []
        },
        {
          id: 3,
          author: 1,
          content: "third comment",
          created_time: "2018-06-25 15:03",
          updated_time: "2018-06-25 15:03",
          is_private: false,
          is_deleted: false,
          is_blocked: false,
          recomments: []
        }
      ],
      timeslots: []
    },
    currentUser: {
      id: 1,
      email: "jara@example.com",
      first_name: "Moonyeong",
      last_name: "Lee",
      is_active: true,
      is_staff: true,
      joined_date: "2018-06-26",
      profile_image:
        "http://localhost:8000/media/users/profile/KakaoTalk_20180611_161916032.jpg",
      phone: "010-0000-0000",
      groups: [],
      user_permissions: []
    }
  },
  actions,
  mutations,
  getters
};
