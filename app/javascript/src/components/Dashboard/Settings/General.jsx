import React, { useState, useEffect } from "react";

import { Typography, Button, Input, Checkbox, PageLoader } from "neetoui";
import { Container, Header } from "neetoui/layouts";

import organizationApi from "apis/organizations";

const General = () => {
  const [loading, setLoading] = useState(true);
  const [organization, setOrganization] = useState(null);
  const [password, setPassword] = useState("");
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);

  const fetchOrganization = async () => {
    try {
      setLoading(true);
      const response = await organizationApi.show();
      logger.info(response.data);
      setOrganization(response.data.organization);
      setIsPasswordEnabled(response.data.organization.password_enabled);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await organizationApi.update({
        organization: {
          id: organization.id,
          name: organization.name,
          password,
          password_enabled: isPasswordEnabled,
        },
      });
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganization();
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
      <Header className="border-b border-gray-200" title="General Settings" />
      <div className="flex h-full w-full flex-col items-center justify-start p-2">
        <Typography className="mb-4" style="h4">
          Configure general attributes of Scribble
        </Typography>
        <form className="max-w-lg" onSubmit={handleSubmit}>
          <Input
            helpText="Customize the Organization Name which is used to show as the site name in Open Graph Tags."
            label="Organization Name"
            value={organization.name}
            onChange={e =>
              setOrganization({ ...organization, name: e.target.value })
            }
          />
          <div className="border-b mt-5 mb-5" />
          <Checkbox
            checked={isPasswordEnabled}
            id="checkbox_name"
            label="Password Protect Knowledge Base"
            onChange={() => {
              setIsPasswordEnabled(
                prevIsPasswordEnabled => !prevIsPasswordEnabled
              );
            }}
          />
          {isPasswordEnabled && (
            <Input
              className="mt-3"
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          )}
          <div className="mt-8">
            <Button label="Save Changes" style="primary" type="submit" />
            <Button
              label="Cancel"
              style="text"
              onClick={() => setIsPasswordEnabled(false)}
            />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default General;
