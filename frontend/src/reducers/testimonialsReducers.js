import {
  ADDED_TESTIMONIALS_STUDENTS_FAIL,
  ADDED_TESTIMONIALS_STUDENTS_REQUEST,
  ADDED_TESTIMONIALS_STUDENTS_SUCCESS,
  ADDED_TESTIMONIALS_VISITORS_FAIL,
  ADDED_TESTIMONIALS_VISITORS_REQUEST,
  ADDED_TESTIMONIALS_VISITORS_SUCCESS,
  TESTIMONIALS_STUDENTS_CREATE_FAIL,
  TESTIMONIALS_STUDENTS_CREATE_REQUEST,
  TESTIMONIALS_STUDENTS_CREATE_RESET,
  TESTIMONIALS_STUDENTS_CREATE_SUCCESS,
  TESTIMONIALS_STUDENTS_DELETE_FAIL,
  TESTIMONIALS_STUDENTS_DELETE_REQUEST,
  TESTIMONIALS_STUDENTS_DELETE_SUCCESS,
  TESTIMONIALS_VISITORS_CREATE_FAIL,
  TESTIMONIALS_VISITORS_CREATE_REQUEST,
  TESTIMONIALS_VISITORS_CREATE_RESET,
  TESTIMONIALS_VISITORS_CREATE_SUCCESS,
  TESTIMONIALS_VISITORS_DELETE_FAIL,
  TESTIMONIALS_VISITORS_DELETE_REQUEST,
  TESTIMONIALS_VISITORS_DELETE_SUCCESS,
} from "../actions/types";

export const addedStudentsTestimonialsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDED_TESTIMONIALS_STUDENTS_REQUEST:
      return { loading: true, studentsTestimonials: [] };
    case ADDED_TESTIMONIALS_STUDENTS_SUCCESS:
      return { loading: false, studentsTestimonials: action.payload };
    case ADDED_TESTIMONIALS_STUDENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentsTestimonialsCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TESTIMONIALS_STUDENTS_CREATE_REQUEST:
      return { loading: true };
    case TESTIMONIALS_STUDENTS_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        studentsTestimonials: action.payload,
      };
    case TESTIMONIALS_STUDENTS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TESTIMONIALS_STUDENTS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const studentsTestimonialsDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TESTIMONIALS_STUDENTS_DELETE_REQUEST:
      return { loading: true };
    case TESTIMONIALS_STUDENTS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TESTIMONIALS_STUDENTS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addedVisitorsTestimonialsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDED_TESTIMONIALS_VISITORS_REQUEST:
      return { loading: true, visitorsTestimonials: [] };
    case ADDED_TESTIMONIALS_VISITORS_SUCCESS:
      return { loading: false, visitorsTestimonials: action.payload };
    case ADDED_TESTIMONIALS_VISITORS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const visitorsTestimonialsCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TESTIMONIALS_VISITORS_CREATE_REQUEST:
      return { loading: true };
    case TESTIMONIALS_VISITORS_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        visitorsTestimonials: action.payload,
      };
    case TESTIMONIALS_VISITORS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TESTIMONIALS_VISITORS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const visitorsTestimonialsDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TESTIMONIALS_VISITORS_DELETE_REQUEST:
      return { loading: true };
    case TESTIMONIALS_VISITORS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TESTIMONIALS_VISITORS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
