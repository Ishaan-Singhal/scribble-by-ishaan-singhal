import React, { useState, useEffect } from "react";

import { Check, Close, Plus } from "neetoicons";
import { Typography, Input, Button, PageLoader } from "neetoui";
import { Container, Header } from "neetoui/layouts";

import redirectionsApi from "apis/redirections";

import Table from "./Table";

import { REDIRECTION_INITIAL_VALUES } from "../constants";

const Redirections = () => {
  const [path, setPath] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newRedirection, setNewRedirection] = useState(
    REDIRECTION_INITIAL_VALUES
  );

  const [redirections, setRedirections] = useState([]);

  const fetchRedirections = async () => {
    try {
      setLoading(true);
      const response = await redirectionsApi.list();
      logger.info(response.data);
      setRedirections(response.data.redirections);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createRedirection = async () => {
    try {
      await redirectionsApi.create(newRedirection);
      fetchRedirections();
    } catch (error) {
      logger.error(error);
    } finally {
      setPath(false);
    }
  };

  useEffect(() => {
    fetchRedirections();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <Header className="border-b border-gray-200" title="Redirections" />
      <div className="mx-auto flex h-full w-full max-w-xl flex-col items-center justify-start p-2">
        <Typography className="mb-4" style="body1">
          Create and configure redirection rules to send users from old links to
          new links. All redirections are performed with 301 status codes to be
          SEO friendly.
        </Typography>
        <div>
          <Table
            fetchRedirections={fetchRedirections}
            redirections={redirections}
          />
          {path && (
            <div className="m-2 grid grid-cols-5 gap-x-4">
              <Input
                required
                className="col-span-2"
                prefix="/"
                value={newRedirection.from}
                onChange={e => {
                  setNewRedirection({
                    ...newRedirection,
                    from: e.target.value,
                  });
                }}
              />
              <Input
                required
                className="col-span-2"
                prefix="/"
                value={newRedirection.to}
                onChange={e => {
                  setNewRedirection({
                    ...newRedirection,
                    to: e.target.value,
                  });
                }}
              />
              <div className="col-span-1 ">
                <Button
                  className="mr-4"
                  icon={Check}
                  style="text"
                  onClick={() => {
                    createRedirection();
                  }}
                />
                <Button
                  icon={Close}
                  style="text"
                  onClick={() => {
                    setPath(false);
                  }}
                />
              </div>
            </div>
          )}
          <Button
            icon={Plus}
            label="Add New Redirection"
            style="text"
            onClick={() => {
              setPath(true);
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default Redirections;
