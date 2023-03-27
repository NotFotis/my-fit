import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addExercise } from "../../reduxParts/reducers/exerciseSlice";

const ExerciseFormAdd = (exerciseStructure) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    repetitions: "",
    tmg: "",
    img: "",
    vid: "",
  });
  const handleSubmit = (event) => {
    // event.preventDefault();
    console.log(formData);
    dispatch(addExercise(formData));
    // setFormData({ name: '', desc: '', repetitions: '', tmg: '', img: '', vid: '' });
  };

  const handleBack = () => {
    navigate("/exercises");
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="exercise-form">
        <label>
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
          />
        </label>

        <label>
          Description:
          <textarea
            value={formData.desc}
            onChange={(event) =>
              setFormData({ ...formData, desc: event.target.value })
            }
          />
        </label>
        <label>
          Repetitions:
          <input
            type="text"
            value={formData.repetitions}
            onChange={(event) =>
              setFormData({ ...formData, repetitions: event.target.value })
            }
          />
        </label>
        <label>
          Target Muscle Group:
          <input
            type="text"
            value={formData.tmg}
            onChange={(event) =>
              setFormData({ ...formData, tmg: event.target.value })
            }
          />
        </label>
        <label>
          Image:
          <input
            type="text"
            value={formData.img}
            onChange={(event) =>
              setFormData({ ...formData, img: event.target.value })
            }
          />
        </label>
        <label>
          Video:
          <input
            type="text"
            value={formData.vid}
            onChange={(event) =>
              setFormData({ ...formData, vid: event.target.value })
            }
          />
        </label>
        <button type="submit">Add Exercise</button>
      </form>
      <button onClick={handleBack}>Back</button>
    </>
  );
};
export default ExerciseFormAdd;
