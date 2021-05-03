import { render } from "@testing-library/react";
import {currentUserFixtures} from "fixtures/currentUserFixtures";
import RoleBadge from "main/components/Profile/RoleBadge"

describe("RoleBadge tests", () => {

    test("renders without crashing for ROLE_USER when user has ROLE_USER", () => {
        render(
            <RoleBadge currentUser={currentUserFixtures.userOnly} role={"ROLE_USER"} />
        );
    });

    test("renders without crashing for ROLE_ADMIN when user has ROLE_ADMIN", () => {
        render(
            <RoleBadge currentUser={currentUserFixtures.adminUser} role={"ROLE_ADMIN"} />
        );
    });

    test("renders without crashing for ROLE_ADMIN when user does NOT have ROLE_ADMIN", () => {
        render(
            <RoleBadge currentUser={currentUserFixtures.userOnly} role={"ROLE_ADMIN"} />
        );
    });

});