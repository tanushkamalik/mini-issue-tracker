"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [loading, setLoading] = useState(false);

  // READ
  async function fetchIssues() {
    const { data, error } = await supabase
      .from("issue")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching issues:", error);
      return;
    }

    setIssues(data || []);
  }

  useEffect(() => {
    fetchIssues();
  }, []);

  // CREATE
  async function addIssue(e) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter an issue title.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("issue").insert({
      title,
      description,
      status: "Open",
      priority,
    });

    if (error) {
      console.error("Error creating issue:", error);
      alert("Could not create issue.");
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      await fetchIssues();
    }

    setLoading(false);
  }

  // UPDATE
  async function updateStatus(id, status) {
    const { error } = await supabase
      .from("issue")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Error updating issue:", error);
      return;
    }

    await fetchIssues();
  }

  // DELETE
  async function deleteIssue(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this issue?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("issue")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting issue:", error);
      return;
    }

    await fetchIssues();
  }

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Mini Issue Tracker</h1>

      {/* CREATE */}
      <form
        onSubmit={addIssue}
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <h2>Add New Issue</h2>

        <input
          type="text"
          placeholder="Issue title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyle}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={inputStyle}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Adding..." : "Add Issue"}
        </button>
      </form>

      {/* READ */}
      <section style={{ marginTop: "40px" }}>
        <h2>Issues</h2>

        {issues.length === 0 ? (
          <p>No issues found.</p>
        ) : (
          issues.map((issue) => (
            <div key={issue.id} style={cardStyle}>
              <h3>{issue.title}</h3>

              <p>{issue.description}</p>

              <p>
                <strong>Priority:</strong> {issue.priority}
              </p>

              {/* UPDATE */}
              <label>
                <strong>Status: </strong>

                <select
                  value={issue.status}
                  onChange={(e) =>
                    updateStatus(issue.id, e.target.value)
                  }
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </label>

              {/* DELETE */}
              <br />
              <button
                onClick={() => deleteIssue(issue.id)}
                style={deleteButtonStyle}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginTop: "12px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const buttonStyle = {
  marginTop: "15px",
  padding: "10px 18px",
  border: "none",
  borderRadius: "6px",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
};

const deleteButtonStyle = {
  marginTop: "12px",
  padding: "8px 14px",
  border: "none",
  borderRadius: "5px",
  background: "#dc2626",
  color: "#fff",
  cursor: "pointer",
};

const cardStyle = {
  marginTop: "15px",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
};