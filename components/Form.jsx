import React from "react";
import Link from "next/link";
const Form = ({ type, post, submitting, handleSubmit, setPost }) => {
  return (
    <section className="w-full w-m-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered Platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Ai Prompt
          </span>
        </label>
        <textarea
          className="form_textarea"
          placeholder="Write your prompt here..."
          value={post.prompt}
          required
          onChange={(e) =>
            setPost((post) => ({ ...post, prompt: e.target.value }))
          }
        ></textarea>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{" "}
            <span className="font-normal">
              (#development, #ai, #blockchain)
            </span>
          </span>
          <input
            type="text"
            placeholder="#tag"
            className="form_input"
            value={post.tag}
            onChange={(e) =>
              setPost((post) => ({ ...post, tag: e.target.value }))
            }
          />
        </label>

        <div className="flex-end mx-3 mb55 gap-4">
          <Link href="/" className="text-sm text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="text-sm bg-primary-orange rounded-full text-white px-8 py-2"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
