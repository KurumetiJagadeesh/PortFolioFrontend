import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, message } from "antd";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminProjects() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const projects = portfolioData?.projects || [];
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type, setType] = React.useState("add");

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-project", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-project", values);
      }
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        dispatch(ReloadData(true));
      } else {
        
        message.error(response.data.message);
      }
    } catch (error) {
      console.log("hii");
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/delete-project", {
        _id: item._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-white"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
          }}
        >
          Add Project
        </button>
      </div>
      <div className="grid grid-cols-4 gap-10 mt-10">
        {projects.map((project) => (
          <div className="show border border-gray-400 flex flex-col p-5 gap-5" key={project._id}>
            <h1 className="text-secondary text-xl font-bold">
              {project.title}
            </h1>
            <hr />
            <img
              src={project.image}
              alt={project.title}
              className="h-50 w-60"
            />
            <h1>Role: {project.title}</h1>
            <h1>Description:</h1>
            <h1 className="text-justify">{project.description}</h1>
            <div className="flex justify-end gap-10">
              <button
                className="bg-primary text-white px-5 py-2 rounded-md"
                onClick={() => {
                  onDelete(project);
                }}
              >
                Delete
              </button>
              <button
                className="bg-red-700 text-white px-5 py-2 rounded-md"
                onClick={() => {
                  setSelectedItemForEdit(project);
                  setShowAddEditModal(true);
                  setType("edit");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      {showAddEditModal && (
        <Modal
          visible={showAddEditModal}
          title={selectedItemForEdit ? "Edit Project" : "Add Project"}
          footer={null}
          onCancel={() => setShowAddEditModal(false)}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={selectedItemForEdit || {}}
          >
            <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required' }]}>
              <input placeholder="Title" />
            </Form.Item>
            <Form.Item name="image" label="Image URL" rules={[{ required: true, message: 'Image URL is required' }]}>
              <input placeholder="Image URL" />
            </Form.Item>
            <Form.Item name="technologies" label="Technologies" rules={[{ required: true, message: 'Technologies are required' }]}>
              <input placeholder="Technologies" />
            </Form.Item>
            <Form.Item name="link" label="Link" rules={[{ required: true, message: 'Link are required' }]}>
              <input placeholder="Link" />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Description is required' }]}>
              <textarea placeholder="Description" />
            </Form.Item>
            <div className="flex justify-end gap-5">
              <button
                className="bg-red-600 text-white px-5 py-2"
                onClick={() => setShowAddEditModal(false)}
              >
                Cancel
              </button>
              <button className="bg-primary text-white px-5 py-2" type="submit">
                {selectedItemForEdit ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default AdminProjects;
