// @flow strict
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import Layout from "../components/Layout";
import Post from "../components/Post";
import { useSiteMetadata } from "../hooks";

PostTemplate.propTypes = {
  data: PropTypes.object
};

export default function PostTemplate({ data }) {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { frontmatter } = data.markdownRemark;
  const {
    title: postTitle,
    description: postDescription,
    socialImage
  } = frontmatter;
  const metaDescription =
    postDescription !== null ? postDescription : siteSubtitle;

  return (
    <Layout
      title={`${postTitle} - ${siteTitle}`}
      description={metaDescription}
      socialImage={socialImage}
    >
      <Post post={data.markdownRemark} />
    </Layout>
  );
}

export const query = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        tagSlugs
      }
      frontmatter {
        date
        description
        tags
        title
        socialImage
      }
    }
  }
`;
