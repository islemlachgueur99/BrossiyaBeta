import { Card, CardBody } from "reactstrap";
import PropTypes from "prop-types";
import { Chip } from "@nextui-org/react";

const TopCards = ({ bg, icon, earning, subtitle }) => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex">
          <div className={`circle-box lg-box d-inline-block ${bg}`}>
            <i className={icon} />
          </div>
          <div className="ms-3">
            <h3 className="mb-0 font-weight-bold">
              {" "}
              <Chip color="success" variant="light">
                <b> {earning}</b>
              </Chip>
            </h3>
            <small className="text-muted">
              {" "}
              <Chip color="danger" variant="dot">
                {subtitle}
              </Chip>
            </small>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

TopCards.propTypes = {
  bg: PropTypes.string,
  icon: PropTypes.string,
  earning: PropTypes.string,
  subtitle: PropTypes.string,
};

export default TopCards;
