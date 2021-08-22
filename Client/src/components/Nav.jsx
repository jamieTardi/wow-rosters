import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { CreateRaid } from './NavItems/index';

const Nav = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [raidModalShow, setRaidModalShow] = useState(false);

	return (
		<div>
			<Button variant='primary' onClick={handleShow}>
				Launch
			</Button>
			<Offcanvas show={show} onHide={handleClose} backdrop={false}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Offcanvas</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<CreateRaid
						setRaidModalShow={setRaidModalShow}
						raidModalShow={raidModalShow}
					/>
				</Offcanvas.Body>
			</Offcanvas>
		</div>
	);
};

export default Nav;
