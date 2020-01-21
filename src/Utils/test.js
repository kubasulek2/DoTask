const TasksLists = ({ tasks: { lists, listsOrder, active }, setCategory }) => {
	const classes = useStyles();
	return (
		<Droppable droppableId='lists' type='list'>
			{({ droppableProps, innerRef, placeholder }) => (
				<RootRef rootRef={innerRef}>
					<List className={classes.root} {...droppableProps}>
						{listsOrder.map((col, i) => {
							return (
								<Droppable droppableId={col} key={col + i}>
									{({ droppableProps, innerRef, placeholder }, snapshot) => (
										<RootRef rootRef={innerRef}>
											<Draggable draggableId={col} index={i}>
												{({ draggableProps, dragHandleProps, innerRef }) => {
													const over = snapshot.draggingOverWith && snapshot.draggingOverWith.includes('task') ? classes.over : null
													return (
														<ListItem
															ref={innerRef}
															{...draggableProps}
															{...droppableProps}
															className={[classes.listItem, over].join(' ')}
															button
															selected={col === active}
															onClick={() => setCategory(col)}
														>
															<ListItemIcon className={classes.icon} {...dragHandleProps}>
																<ListIcon />
															</ListItemIcon>
															<ListItemText
																secondary={lists[col].title}
																classes={{ secondary: active ? classes.secondary_edit : classes.secondary }}
																primaryTypographyProps={{
																	noWrap: true,
																	component: 'p'
																}}
															/>
															{placeholder}
															<ListItemSecondaryAction>
																{col === active ? <IconButton size='small' className={classes.editIcon}><EditIcon /></IconButton> : null}
																<span className={classes.badge}>6</span>
															</ListItemSecondaryAction>
														</ListItem>
													)
												}}
											</Draggable>
										</RootRef>
									)}
								</Droppable>
							);
						})}
						{placeholder}
					</List>
				</RootRef>
			)}
		</Droppable>

	);
};



// only list dragging

const TasksLists = ({ tasks: { lists, listsOrder, active }, setCategory }) => {
	const classes = useStyles();
	return (
		<Droppable droppableId='lists' type='list'>
			{({ droppableProps, innerRef, placeholder }) => (
				<RootRef rootRef={innerRef}>
					<List className={classes.root} {...droppableProps}>
						{listsOrder.map((col, i) => {
							return (

								<Draggable draggableId={col} index={i} key={col + i}>
									{({ draggableProps, dragHandleProps, innerRef }) => (
										<ListItem
											ref={innerRef}
											{...draggableProps}
											className={classes.listItem}
											button
											selected={col === active}
											onClick={() => setCategory(col)}
										>
											<ListItemIcon className={classes.icon} {...dragHandleProps}>
												<ListIcon />
											</ListItemIcon>
											<ListItemText
												secondary={lists[col].title}
												classes={{ secondary: active ? classes.secondary_edit : classes.secondary }}
												primaryTypographyProps={{
													noWrap: true,
													component: 'p'
												}}
											/>
											<ListItemSecondaryAction>
												{col === active ? <IconButton size='small' className={classes.editIcon}><EditIcon /></IconButton> : null}
												<span className={classes.badge}>6</span>
											</ListItemSecondaryAction>
										</ListItem>
									)}
								</Draggable>

							);
						})}
						{placeholder}
					</List>
				</RootRef>
			)}
		</Droppable>

	);
};
